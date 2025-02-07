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
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

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
    getQuiz: <T extends IKnowledgeQuiz | IPersonalityQuiz>(
        id: string,
    ) => T | undefined;
    getMoreQuizzes: () => void;
    updateQuiz: (id: string, quiz: IQuiz) => void;
    createQuiz: (quiz: IQuiz) => void;
    playQuiz: (id: string) => void;
    deleteQuiz: (id: string) => void;
}

const QuizzesContext = createContext<IQuizzesContext | null>(null);

export const useQuizzes = () => {
    const currentQuizzesContext = useContext(QuizzesContext);
    if (!currentQuizzesContext) {
        throw new Error(
            "useQuizzes has to be used within <QuizzesContext.Provider>",
        );
    }
    return currentQuizzesContext;
};

export function QuizzesProvider({ children }: { children: ReactNode }) {
    const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot>();

    useEffect(() => {
        (async () => {
            // const data = await getQuizzes();
            let { quizzes, lastVisible } = await getQuizzes();
            quizzes = quizzes.filter((item) => item.questions);
            setQuizzes(quizzes);
            setLastVisible(lastVisible);
            setLoading(false);
        })();
    }, []);

    async function getMoreQuizzes() {
        if (lastVisible) {
            const data = await getQuizzes(lastVisible);
            setLastVisible(data.lastVisible);
            setQuizzes((prev) => {
                return [...prev, ...data.quizzes];
            });
        }
    }

    function getQuiz<T extends IKnowledgeQuiz | IPersonalityQuiz>(id: string) {
        return quizzes.find((value) => value.id == id) as T | undefined;
    }

    function updateQuiz(id: string, quiz: IQuiz) {
        setQuiz(id, quiz);
        setQuizzes((prev) => {
            const index = prev.findIndex((value) => value.id == id);
            prev[index] = quiz;
            return [...prev];
        });
    }

    function playQuiz(id: string) {
        setQuiz(id, { plays: increment(1) });
        setQuizzes((prev) => {
            const index = prev.findIndex((value) => value.id == id);
            prev[index].plays++;
            return [...prev];
        });
    }

    function deleteQuiz(id: string) {
        deleteDoc(doc(db, "quizzes", id));
        setQuizzes((prev) => {
            const index = prev.findIndex((value) => value.id == id);
            prev.splice(index, 1);
            return [...prev];
        });
    }

    async function createQuiz(quiz: IQuiz) {
        const quizRef = await addDoc(collection(db, "quizzes"), {
            ...quiz,
            created: serverTimestamp(),
            plays: 0,
        });
        quiz.id = quizRef.id;
        setQuizzes((prev) => [
            ...prev,
            { ...quiz, created: Timestamp.fromDate(new Date()), plays: 0 },
        ]);
    }

    const quizzesContext: IQuizzesContext = {
        quizzes,
        loading,
        getMoreQuizzes,
        getQuiz,
        updateQuiz,
        createQuiz,
        playQuiz,
        deleteQuiz,
    };

    return (
        <QuizzesContext.Provider value={quizzesContext}>
            {children}
        </QuizzesContext.Provider>
    );
}
