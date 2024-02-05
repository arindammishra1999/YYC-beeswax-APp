interface IQuiz {
    id: string;
    title: string;
    description: string;
    count: number;
    type: "Knowledge" | "Personality";
    created: firebase.firestore.Timestamp;
    plays: number;

    // Knowledge Quiz
    difficulty: string;

    // Personality Quiz
    weights: { [key: string]: string };
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

interface IReview {
    id: string;
    userId: string;
    title: string;
    review: string;
    rating: number;
}
