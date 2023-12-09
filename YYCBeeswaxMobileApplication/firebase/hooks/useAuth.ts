import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "@/firebase/config";

export default function useAuth() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    return { user };
}
