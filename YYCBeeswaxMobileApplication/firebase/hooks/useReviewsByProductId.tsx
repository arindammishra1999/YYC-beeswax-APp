import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    QueryDocumentSnapshot,
    startAfter,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/firebase/config";
import { useUser } from "@/firebase/providers/userProvider";

export function useReviewsByProductId(id: string) {
    const [userReview, setUserReview] = useState<IReview>();
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot>();

    const col = collection(db, "products", id, "reviews");

    const { user } = useUser();

    useEffect(() => {
        (async () => {
            if (user) {
                const docSnap = await getDoc(doc(col, user.uid));
                if (docSnap.exists()) {
                    setUserReview({
                        id: docSnap.id,
                        ...docSnap.data(),
                    } as IReview);
                }
            }

            const querySnap = await getDocs(
                query(
                    col,
                    orderBy("userId"),
                    orderBy("lastUpdated", "desc"),
                    where("userId", "!=", user?.uid ?? ""),
                    limit(4),
                ),
            );
            setLastVisible(querySnap.docs.at(-1));
            setReviews(
                querySnap.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data(),
                    } as IReview;
                }),
            );
        })();
    }, []);

    const getMoreReviews = async () => {
        if (lastVisible) {
            const querySnap = await getDocs(
                query(
                    col,
                    orderBy("lastUpdated", "desc"),
                    startAfter(lastVisible),
                    limit(4),
                ),
            );
            setLastVisible(querySnap.docs.at(-1));
            const newReviews = querySnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                } as IReview;
            });
            setReviews((prev) => {
                return [...prev, ...newReviews];
            });
        }
    };

    return { userReview, reviews, getMoreReviews };
}
