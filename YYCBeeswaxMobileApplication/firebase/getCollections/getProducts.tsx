import { collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase/config";
import { getLocalCache, setLocalCache } from "@/lib/utility";

export async function getProductData() {
    const querySnapshot = await getDocs(collection(db, "products"));
    if (querySnapshot.metadata.fromCache && querySnapshot.empty) {
        return getLocalCache("products");
    }
    const products = querySnapshot.docs.map((doc) => {
        return {
            id: doc.id,
            data: doc.data(),
        };
    });
    setLocalCache("products", products);
    return products;
}
