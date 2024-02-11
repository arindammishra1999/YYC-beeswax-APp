import { doc, setDoc } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function setQuiz(id: string, quiz: Partial<IQuiz>) {
    try {
        const quizRef = doc(db, "quizzes", id);
        await setDoc(quizRef, quiz, { merge: true });
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}
