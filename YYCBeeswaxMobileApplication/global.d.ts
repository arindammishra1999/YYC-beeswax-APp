interface IQuiz {
    id: string;
    title: string;
    description: string;
    // count: number;
    type: "Knowledge" | "Personality";
    created: firebase.firestore.Timestamp;
    plays: number;
    questions: (IKnowledgeQuestion | IPersonalityQuestion)[];
}

interface IKnowledgeQuiz extends IQuiz {
    // Knowledge Quiz
    difficulty: string;
    questions: IKnowledgeQuestion[];
}

interface IPersonalityQuiz extends IQuiz {
    // Personality Quiz
    weights: { [key: string]: string };
    questions: IPersonalityQuestion[];
}

interface IKnowledgeQuestion {
    id: string;
    question: string;
    difficulty: string;
    correctAnswer: string;
    incorrectAnswer1: string;
    incorrectAnswer2: string;
    incorrectAnswer3: string;
    answers: string[];
}

interface IPersonalityQuestion {
    id: string;
    question: string;
    options: {
        value: string;
        weights: { [key: string]: number };
    }[];
}

interface IUser {
    email: string;
    firstName: string;
    lastName: string;
}

interface IProduct {
    name: string;
    description: string;
    categories: string[];
    variants?: {
        name: string;
        values: string[];
    };
    additionalInfo?: any[];
    reviews?: {
        "1"?: number;
        "2"?: number;
        "3"?: number;
        "4"?: number;
        "5"?: number;
        count: number;
        avg: number;
    };
    price: number;
    stock: number;
    url?: string;
}

interface IReview {
    id?: string;
    userId: string;
    username: string;
    title: string;
    review: string;
    rating: number;
    lastUpdated: firebase.firestore.Timestamp;
}
