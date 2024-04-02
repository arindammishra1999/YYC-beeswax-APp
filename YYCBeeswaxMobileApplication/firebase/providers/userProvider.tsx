import { User } from "firebase/auth";
import React, { createContext, ReactNode, useContext } from "react";

interface IUserContext {
    user: User | null;
    isAdmin: boolean | null;
}

const UserContext = createContext<IUserContext | null>(null);

export const useUser = () => {
    const currentUserContext = useContext(UserContext);
    if (!currentUserContext) {
        throw new Error(
            "useForm has to be used within <ExperimentContext.Provider>",
        );
    }
    return currentUserContext;
};

export function UserProvider({
    children,
    data,
}: {
    children: ReactNode;
    data: IUserContext;
}) {
    return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}
