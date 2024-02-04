import { doc, getDocs, collection } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function getUserOrders(id: string) {
    try {
        const userDocRef = doc(db, "users", id);

        const orderSnapshot = await getDocs(collection(userDocRef, "orders"));

        const orders = orderSnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                data: doc.data(),
            };
        });

        return orders;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}
