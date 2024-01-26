import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function getQuizById<
    T extends IPersonalityQuestion | IKnowledgeQuestion,
>(id: string) {
    try {
        const docSnap = await getDoc(doc(db, "quizzes", id));
        const quiz = {
            id: docSnap.id,
            ...docSnap.data(),
        } as IQuiz;

        const querySnap = await getDocs(
            collection(db, "quizzes", quiz.id, "questions"),
        );
        const questions = querySnap.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            } as T;
        });

        return { quiz, questions };
    } catch (error) {
        console.error("Error getting document: ", error);
    }
}
