import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { db } from "@/firebase/config";
import { getQuizzes } from "@/firebase/getCollections/getQuizzes";

interface IQuizzesContext {
    quizzes: IQuiz[];
    loading: boolean;
    getQuiz: <T extends IKnowledgeQuiz | IPersonalityQuiz>(
        id: string,
    ) => T | undefined;
    updateQuiz: (id: string, quiz: IQuiz) => void;
    createQuiz: (quiz: IQuiz) => void;
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

    useEffect(() => {
        (async () => {
            const data = await getQuizzes();
            setQuizzes(data);
            setLoading(false);
        })();
    }, []);

    function getQuiz<T extends IKnowledgeQuiz | IPersonalityQuiz>(id: string) {
        return quizzes.find((value) => value.id == id) as T | undefined;
    }

    function updateQuiz(id: string, quiz: IQuiz) {
        setDoc(doc(db, "quizzes", id), quiz, { merge: true });
        setQuizzes((prev) => {
            const index = prev.findIndex((value) => (value.id = quiz.id));
            prev[index] = quiz;
            return [...prev];
        });
    }

    async function createQuiz(quiz: IQuiz) {
        const quizRef = await addDoc(collection(db, "quizzes"), quiz);
        quiz.id = quizRef.id;
        setQuizzes((prev) => [...prev, quiz]);
    }

    const quizzesContext: IQuizzesContext = {
        quizzes,
        loading,
        getQuiz,
        updateQuiz,
        createQuiz,
    };

    return (
        <QuizzesContext.Provider value={quizzesContext}>
            {children}
        </QuizzesContext.Provider>
    );
}
