import { doc, getDoc } from "firebase/firestore";

import { db } from "@/firebase/config";

export async function getProductDataById(id: any) {
    try {
        const ref = doc(db, "products", id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            const product = docSnap.data() as IProduct;

            if (product.reviews) {
                product.reviews.count = 0;
                product.reviews.avg = 0;
                for (const i of ["1", "2", "3", "4", "5"] as const) {
                    product.reviews.count += product.reviews[i] ?? 0;
                    product.reviews.avg +=
                        (product.reviews[i] ?? 0) * parseInt(i, 10);
                }
                product.reviews.avg /= product.reviews.count;
            }

            return product;
        } else {
            console.error("Product with id: " + id + " wasn't found");
        }
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}
