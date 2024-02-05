import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    QueryDocumentSnapshot,
    startAfter,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/firebase/config";

export function useReviewsByProductId(id: string) {
    const [reviews, setReviews] = useState<IReview[]>([]);
    const [lastVisible, setLastVisible] = useState<
        QueryDocumentSnapshot | undefined
    >(undefined);

    const col = collection(db, "products", id, "reviews");

    useEffect(() => {
        (async () => {
            try {
                const querySnap = await getDocs(
                    query(col, orderBy("lastUpdated", "desc"), limit(4)),
                );
                console.log(
                    querySnap.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        } as IReview;
                    }),
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
            } catch (error) {
                console.error("Error getting document: ", error);
            }
        })();
    }, []);

    const getMoreReviews = async () => {
        console.log("fetched called");
        if (lastVisible) {
            const querySnap = await getDocs(
                query(
                    col,
                    orderBy("lastUpdated", "desc"),
                    startAfter(lastVisible),
                    limit(4),
                ),
            );
            console.log("fetched");
            setLastVisible(querySnap.docs.at(-1));
            const newReviews = querySnap.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data(),
                } as IReview;
            });
            console.log(newReviews);
            setReviews((prev) => {
                return [...prev, ...newReviews];
            });
        }
    };

    return { reviews, getMoreReviews };
}
