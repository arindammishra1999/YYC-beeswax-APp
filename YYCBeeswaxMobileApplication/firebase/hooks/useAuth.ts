import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "@/firebase/config";

export default function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                setIsAdmin(!!idTokenResult.claims?.isAdmin);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, [onAuthStateChanged]);

    return { user, loading, isAdmin };
}
