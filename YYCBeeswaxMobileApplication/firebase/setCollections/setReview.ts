import { doc, setDoc } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function setReview(id: string, review: Partial<IReview>) {
    try {
        const reviewRef = doc(db, "quizzes", id);
        await setDoc(reviewRef, review, { merge: true });
    } catch (error) {
        console.error("Error setting document: ", error);
    }
}
