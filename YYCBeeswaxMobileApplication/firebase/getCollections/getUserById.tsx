import { doc, getDoc } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function getUserById(id: string) {
    try {
        const docSnap = await getDoc(doc(db, "users", id));
        return docSnap.data() as IUser;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}
