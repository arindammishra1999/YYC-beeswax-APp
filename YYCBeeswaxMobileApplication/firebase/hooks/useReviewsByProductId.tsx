import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    increment,
    limit,
    orderBy,
    query,
    QueryConstraint,
    QueryDocumentSnapshot,
    serverTimestamp,
    setDoc,
    startAfter,
    Timestamp,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/firebase/config";
import { useUser } from "@/firebase/providers/userProvider";

async function getReviewsByProductId({
    productId,
    userId,
    lastVisible,
}: {
    productId: string;
    userId?: string;
    lastVisible?: QueryDocumentSnapshot;
}) {
    const constraints: QueryConstraint[] = [];
    if (userId) {
        constraints.push(orderBy("userId"));
        constraints.push(where("userId", "!=", userId));
    }
    constraints.push(orderBy("lastUpdated", "desc"));
    if (lastVisible) {
        constraints.push(startAfter(lastVisible));
    }
    constraints.push(limit(4));
    const querySnap = await getDocs(
        query(collection(db, "products", productId, "reviews"), ...constraints),
    );
    return {
        lastVisible: querySnap.docs.at(-1),
        reviews: querySnap.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            } as IReview;
        }),
    };
}

async function getReviewByUserId(productId: string, userId: string) {
    const docSnap = await getDoc(
        doc(db, "products", productId, "reviews", userId),
    );
    if (docSnap.exists()) {
        return {
            id: docSnap.id,
            ...docSnap.data(),
        } as IReview;
    }
}

async function deleteReviewByUserId(productId: string, userId: string) {
    const reviewRef = doc(db, "products", productId, "reviews", userId);
    await deleteDoc(reviewRef);
}

async function setReviewByUserId(
    productId: string,
    userId: string,
    review: Partial<IReview>,
) {
    const reviewRef = doc(db, "products", productId, "reviews", userId);
    await setDoc(reviewRef, review, { merge: true });
}

async function updateReviewAggregation({
    productId,
    rating,
    oldRating,
}: {
    productId: string;
    rating?: number;
    oldRating?: number;
}) {
    if (oldRating && oldRating == rating) {
        return;
    }
    try {
        const reviewRef = doc(db, "products", productId);
        await setDoc(
            reviewRef,
            {
                reviews: {
                    ...(rating && { [rating]: increment(1) }),
                    ...(oldRating && { [oldRating]: increment(-1) }),
                },
            },
            { merge: true },
        );
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

export function useReviewsByProductId(id: string) {
    const [userReview, setUserReview] = useState<IReview>();
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot>();

    const { user } = useUser();

    useEffect(() => {
        (async () => {
            if (user) {
                setUserReview(await getReviewByUserId(id, user.uid));
            }
            const { reviews, lastVisible } = await getReviewsByProductId({
                productId: id,
                userId: user?.uid,
            });
            setLastVisible(lastVisible);
            setReviews(reviews);
        })();
    }, []);

    async function getMoreReviews() {
        if (lastVisible) {
            const data = await getReviewsByProductId({
                productId: id,
                userId: user?.uid,
                lastVisible,
            });
            setLastVisible(data.lastVisible);
            setReviews((prev) => {
                return [...prev, ...data.reviews];
            });
        }
    }

    function updateUserReview(review: {
        title: string;
        review: string;
        rating: number;
    }) {
        if (user) {
            updateReviewAggregation({
                productId: id,
                rating: review.rating,
                oldRating: userReview?.rating,
            });
            setReviewByUserId(id, user.uid, {
                ...review,
                userId: user.uid,
                username: "",
                lastUpdated: serverTimestamp(),
            });
            setUserReview({
                ...review,
                userId: user.uid,
                username: "",
                lastUpdated: Timestamp.fromDate(new Date()),
            });
        }
    }

    function deleteUserReview() {
        if (user && userReview) {
            updateReviewAggregation({
                productId: id,
                oldRating: userReview.rating,
            });
            deleteReviewByUserId(id, user.uid);
            setUserReview(undefined);
        }
    }

    return {
        userReview,
        reviews,
        getMoreReviews,
        updateUserReview,
        deleteUserReview,
    };
}
