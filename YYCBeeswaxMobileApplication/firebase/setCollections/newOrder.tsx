import { collection, setDoc, doc, addDoc } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function newOrder(userId: string, orderData: any) {
    try {
        const userDocRef = doc(db, "users", userId);

        const orderCollection = collection(userDocRef, "orders");

        if (orderCollection) {
            await setDoc(doc(orderCollection), orderData);
        } else {
            await addDoc(orderCollection, orderData);
        }
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}
