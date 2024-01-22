import { collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function getQuizzes() {
    try {
        const query = await getDocs(collection(db, "quizzes"));
        const quizzes = query.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            } as IQuiz;
        });
        return quizzes;
    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
}
