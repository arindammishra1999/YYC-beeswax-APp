import { getDocs, collectionGroup } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function getAllFunFacts() {
    try {
        const query = collectionGroup(db, "facts");

        const querySnapshot = await getDocs(query);

        const facts = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                data: doc.data(),
            };
        });

        return facts;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}
