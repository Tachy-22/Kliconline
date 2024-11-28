"use server";
import { collection, getDocs, query, where, WhereFilterOp, DocumentData, Query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FirebaseError } from "./addDocument";

type FilterType = [string, WhereFilterOp, unknown];

export async function fetchCollection<T>(
  collectionName: string,
  filters?: FilterType[]
): Promise<{ id: string; data: T }[] | FirebaseError> {
  try {
    if (!collectionName) {
      throw new Error("Missing collection name");
    }

    const collectionRef = collection(db, collectionName);
    let q: Query<DocumentData> = collectionRef;

    if (filters && filters.length > 0) {
      const filterConditions = filters.map(([field, op, value]) => 
        where(field, op, value)
      );
      q = query(collectionRef, ...filterConditions);
    }

    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as T,
    }));

    return documents;
  } catch (error) {
    return {
      code: "fetch-collection-error",
      message:
        error instanceof Error ? error.message : "Failed to fetch collection",
    };
  }
}