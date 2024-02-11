import { addDoc, collection, increment } from "firebase/firestore";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { db } from "@/firebase/config";
import { getQuizzes } from "@/firebase/getCollections/getQuizzes";
import { setQuiz } from "@/firebase/setCollections/setQuiz";

interface IQuizzesContext {
    quizzes: IQuiz[];
    loading: boolean;
    getQuiz: <T extends IKnowledgeQuiz | IPersonalityQuiz>(
        id: string,
    ) => T | undefined;
    updateQuiz: (id: string, quiz: IQuiz) => void;
    createQuiz: (quiz: IQuiz) => void;
    playQuiz: (id: string) => void;
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
            // const data = await getQuizzes();
            let data = await getQuizzes();
            data = data.filter((item) => item.questions);
            setQuizzes(data);
            setLoading(false);
        })();
    }, []);

    function getQuiz<T extends IKnowledgeQuiz | IPersonalityQuiz>(id: string) {
        return quizzes.find((value) => value.id == id) as T | undefined;
    }

    function updateQuiz(id: string, quiz: IQuiz) {
        setQuiz(id, quiz);
        setQuizzes((prev) => {
            const index = prev.findIndex((value) => (value.id = id));
            prev[index] = quiz;
            return [...prev];
        });
    }

    function playQuiz(id: string) {
        setQuiz(id, { plays: increment(1) });
        setQuizzes((prev) => {
            const index = prev.findIndex((value) => (value.id = id));
            prev[index].plays++;
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
        playQuiz,
    };

    return (
        <QuizzesContext.Provider value={quizzesContext}>
            {children}
        </QuizzesContext.Provider>
    );
}
