import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { getQuizzes } from "@/firebase/getCollections/getQuizzes";

interface IQuizzesContext {
    quizzes: IQuiz[];
    loading: boolean;
    getQuizById: <T extends IKnowledgeQuiz | IPersonalityQuiz>(
        id: string,
    ) => T | undefined;
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

    function getQuizById<T extends IKnowledgeQuiz | IPersonalityQuiz>(
        id: string,
    ) {
        return quizzes.find((value) => value.id == id) as T | undefined;
    }

    const quizzesContext: IQuizzesContext = { quizzes, loading, getQuizById };

    return (
        <QuizzesContext.Provider value={quizzesContext}>
            {children}
        </QuizzesContext.Provider>
    );
}
