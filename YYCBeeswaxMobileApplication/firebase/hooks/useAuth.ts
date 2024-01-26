import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "@/firebase/config";

export default function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, [onAuthStateChanged]);

    return { user, loading };
}
