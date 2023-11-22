import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from 'react';

export default function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, user => {
            console.log('user is: ', user)
            setUser(user);
        });
        return unSubscribe;
    }, []);

    return { user };
}