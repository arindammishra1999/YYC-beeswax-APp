import { collection, setDoc, doc } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function setUser(id: any, userData: any) {
    try {
        const userCollection = collection(db, "users");

        const userDocRef = doc(userCollection, id);

        await setDoc(userDocRef, userData);
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}
