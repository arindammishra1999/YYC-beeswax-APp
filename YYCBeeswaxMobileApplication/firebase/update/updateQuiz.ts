import { doc, increment, setDoc } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function updateQuiz(id: string) {
    try {
        const quizRef = doc(db, "quizzes", id);
        await setDoc(quizRef, { plays: increment(1) }, { merge: true });
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}
