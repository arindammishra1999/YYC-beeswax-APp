import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function getDiscountData() {
    try {
        const discountCollectionRef = collection(db, "discounts");
        const orderedQuery = query(
            discountCollectionRef,
            orderBy("created", "desc"),
        );
        const querySnapshot = await getDocs(orderedQuery);

        const discounts = querySnapshot.docs.map((doc) => {
            return {
                id: doc.id,
                data: doc.data(),
            };
        });

        return discounts;
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}
