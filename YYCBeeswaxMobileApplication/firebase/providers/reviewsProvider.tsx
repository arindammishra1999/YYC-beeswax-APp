import { useLocalSearchParams } from "expo-router";
import { createContext, ReactNode, useContext } from "react";

import { useReviewsByProductId } from "@/firebase/hooks/useReviewsByProductId";

type IReviewsContext = ReturnType<typeof useReviewsByProductId>;

const ReviewsContext = createContext<IReviewsContext | null>(null);

export const useReviews = () => {
    const currentReviewsContext = useContext(ReviewsContext);
    if (!currentReviewsContext) {
        throw new Error(
            "useReviews has to be used within <ReviewsContext.Provider>",
        );
    }
    return currentReviewsContext;
};

export function ReviewsProvider({ children }: { children: ReactNode }) {
    const { productId } = useLocalSearchParams();
    const reviewContext = useReviewsByProductId(productId as string);
    return (
        <ReviewsContext.Provider value={reviewContext}>
            {children}
        </ReviewsContext.Provider>
    );
}
