import { collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase/config";
import { getLocalCache, setLocalCache } from "@/lib/utility";

export async function getProductData() {
    const querySnapshot = await getDocs(collection(db, "products"));
    if (querySnapshot.metadata.fromCache && querySnapshot.empty) {
        return (await getLocalCache("products")) as {
            id: string;
            data: IProduct;
        }[];
    }
    const products = querySnapshot.docs.map((doc) => {
        const product = doc.data() as IProduct;
        if (product.reviews) {
            product.reviews.count = 0;
            product.reviews.avg = 0;
            for (const i of ["1", "2", "3", "4", "5"] as const) {
                product.reviews.count += product.reviews[i] ?? 0;
                product.reviews.avg +=
                    (product.reviews[i] ?? 0) * parseInt(i, 10);
            }
            if (product.reviews.count > 0) {
                product.reviews.avg /= product.reviews.count;
            }
        }
        return {
            id: doc.id,
            data: product,
        };
    });
    setLocalCache("products", products);
    return products;
}
