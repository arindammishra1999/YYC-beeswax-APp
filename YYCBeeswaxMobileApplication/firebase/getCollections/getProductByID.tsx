import { doc, getDoc } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function getProductDataById(id: any) {
    try {
        const ref = doc(db, "products", id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("Product with id: " + id + " wasn't found");
        }
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}
