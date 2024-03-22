import { collection, setDoc, doc, addDoc } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function newOrder(userId: string, orderData: IOrder) {
    try {
        const userDocRef = doc(db, "users", userId);
        const userOrderCollection = collection(userDocRef, "orders");

        const ordersCollection = collection(db, "orders");
        const orderDocRef = doc(ordersCollection);

        await setDoc(orderDocRef, orderData);

        if (userOrderCollection) {
            await setDoc(doc(userOrderCollection), orderData);
        } else {
            await addDoc(userOrderCollection, orderData);
        }
    } catch (error) {
        console.error("Error updating documents: ", error);
    }
}
