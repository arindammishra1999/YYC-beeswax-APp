import {
    addDoc,
    collection,
    deleteDoc,
    doc,
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
} from "firebase/firestore";
import { create } from "zustand";

import { db } from "@/firebase/config";

async function getQuizzes(lastVisible?: QueryDocumentSnapshot) {
    // try {
    //     const query = await getDocs(collection(db, "quizzes"));
    //     const quizzes = query.docs.map((doc) => {
    //         return {
    //             id: doc.id,
    //             ...doc.data(),
    //         } as IQuiz;
    //     });
    //     return quizzes;
    // } catch (error) {
    //     console.error("Error getting documents: ", error);
    //     return [];
    // }

    const constraints: QueryConstraint[] = [];
    constraints.push(orderBy("created", "desc"));
    if (lastVisible) {
        constraints.push(startAfter(lastVisible));
    }
    constraints.push(limit(4));
    const querySnap = await getDocs(
        query(collection(db, "quizzes"), ...constraints),
    );
    return {
        lastVisible: querySnap.docs.at(-1),
        quizzes: querySnap.docs.map((doc) => {
            return {
                id: doc.id,
                ...doc.data(),
            } as IQuiz;
        }),
    };
}

async function setQuiz(id: string, quiz: Partial<IQuiz>) {
    try {
        const quizRef = doc(db, "quizzes", id);
        await setDoc(quizRef, quiz, { merge: true });
    } catch (error) {
        console.error("Error updating document: ", error);
    }
}

interface IQuizzesContext {
    quizzes: IQuiz[];
    loading: boolean;
    lastVisible?: QueryDocumentSnapshot;
    getQuiz: <T extends IKnowledgeQuiz | IPersonalityQuiz>(
        id: string,
    ) => T | undefined;
    getMoreQuizzes: () => void;
    updateQuiz: <T extends IKnowledgeQuiz | IPersonalityQuiz>(
        id: string,
        quiz: T,
    ) => void;
    createQuiz: <T extends IKnowledgeQuiz | IPersonalityQuiz>(quiz: T) => void;
    playQuiz: (id: string) => void;
    deleteQuiz: (id: string) => void;
}

export const useQuizzesStore = create<IQuizzesContext>()((set, get) => ({
    quizzes: [],
    loading: true,
    getQuiz: <T extends IKnowledgeQuiz | IPersonalityQuiz>(id: string) => {
        return get().quizzes.find((value) => value.id == id) as T | undefined;
    },

    getMoreQuizzes: async () => {
        if (get().quizzes.length == 0 || get().lastVisible) {
            const data = await getQuizzes(get().lastVisible);
            data.quizzes = data.quizzes.filter((item) => item.questions);
            set((prev) => ({
                lastVisible: data.lastVisible,
                quizzes: [...prev.quizzes, ...data.quizzes],
                loading: false,
            }));
        }
    },

    updateQuiz: async (id: string, quiz: IQuiz) => {
        setQuiz(id, { ...quiz, created: serverTimestamp() });
        quiz.created = Timestamp.fromDate(new Date());
        set((prev) => {
            const index = prev.quizzes.findIndex((value) => value.id == id);
            prev.quizzes[index] = quiz;
            return { quizzes: [...prev.quizzes] };
        });
    },

    playQuiz: (id: string) => {
        setQuiz(id, { plays: increment(1) });
        set((prev) => {
            const index = prev.quizzes.findIndex((value) => value.id == id);
            prev.quizzes[index].plays++;
            return { quizzes: [...prev.quizzes] };
        });
    },

    deleteQuiz: (id: string) => {
        deleteDoc(doc(db, "quizzes", id));
        set((prev) => {
            const index = prev.quizzes.findIndex((value) => value.id == id);
            prev.quizzes.splice(index, 1);
            return { quizzes: [...prev.quizzes] };
        });
    },

    createQuiz: async (quiz: IQuiz) => {
        const quizRef = await addDoc(collection(db, "quizzes"), {
            ...quiz,
            created: serverTimestamp(),
            plays: 0,
        });
        quiz.id = quizRef.id;
        quiz.created = Timestamp.fromDate(new Date());
        quiz.plays = 0;
        set((prev) => ({
            quizzes: [...prev.quizzes, quiz],
        }));
    },
}));

// persist({
//         name: "quizzes",
//         storage: createJSONStorage(() => AsyncStorage),
//         partialize: (state) => ({ quizzes: state.quizzes }),
// });
