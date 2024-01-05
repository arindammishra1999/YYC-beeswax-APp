import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";

export async function getProductData() {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));

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
