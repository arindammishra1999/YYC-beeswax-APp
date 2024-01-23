import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function getProductDataByCategory(categoryId: string) {
    try {
        const q = query(
            collection(db, "products"),
            where("categories", "array-contains", categoryId),
        );
        const querySnapshot = await getDocs(q);
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
