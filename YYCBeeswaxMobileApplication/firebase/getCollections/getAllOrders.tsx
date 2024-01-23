import { getDocs, collectionGroup } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function getAllOrders() {
    try {
        const query = collectionGroup(db, "orders");

        const querySnapshot = await getDocs(query);

        const orders = querySnapshot.docs.map((doc) => {
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
