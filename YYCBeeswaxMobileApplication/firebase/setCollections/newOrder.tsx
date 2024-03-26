import {
    collection,
    setDoc,
    doc,
    addDoc,
    getDoc,
    updateDoc,
} from "firebase/firestore";

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

        for (const item of orderData.products) {
            const productDocRef = doc(db, "products", item.id);
            const productDocSnapshot = await getDoc(productDocRef);
            if (productDocSnapshot.exists()) {
                const productData = productDocSnapshot.data();
                const newStock = productData.stock - item.amount;
                await updateDoc(productDocRef, {
                    stock: newStock > 0 ? newStock : 0,
                });
            } else {
                console.error(`Product with ID ${item.id} does not exist.`);
            }
        }
    } catch (error) {
        console.error("Error updating documents: ", error);
    }
}
