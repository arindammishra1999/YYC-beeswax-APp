import {
    getDoc,
    doc,
    DocumentReference,
    DocumentData,
    DocumentSnapshot,
} from "firebase/firestore";

import { db } from "@/firebase/config";

export async function getEventDataById(id: any) {
    try {
        const ref: DocumentReference<DocumentData, DocumentData> = doc(
            db,
            "events",
            id,
        );
        const docSnap: DocumentSnapshot<DocumentData, DocumentData> =
            await getDoc(ref);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("Event with id: " + id + " wasn't found");
        }
    } catch (error) {
        console.error("Error getting documents: ", error);
    }
}
