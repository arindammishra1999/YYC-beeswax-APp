import { collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function getEventData() {
    try {
        const querySnapshot = await getDocs(collection(db, "events"));

        const products = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                data: doc.data(),
            };
        });

        return products;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}
