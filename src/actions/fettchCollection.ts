"use sever";

import {
  collection,
  query,
  getDocs,
  where,
  orderBy,
  limit,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FirebaseError } from "./addDocument";

export type QueryOptions = {
  whereClause?: [
    string,
    "<" | "<=" | "==" | ">=" | ">",
    string | number | boolean
  ][];
  orderByField?: string;
  orderDirection?: "asc" | "desc";
  limitTo?: number;
};
export async function fetchCollection<T>(
  collectionName: string,
  options?: QueryOptions
): Promise<{ items: T[]; count: number } | FirebaseError> {
  try {
    if (!collectionName) {
      throw new Error("Collection name is required");
    }

    const constraints: QueryConstraint[] = [];
    if (options?.whereClause) {
      options.whereClause.forEach(([field, operator, value]) => {
        constraints.push(where(field, operator, value));
      });
    }

    if (options?.orderByField) {
      constraints.push(
        orderBy(options.orderByField, options.orderDirection || "asc")
      );
    }

    if (options?.limitTo) {
      constraints.push(limit(options.limitTo));
    }

    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);

    const items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];

    return { items, count: items.length };
  } catch (error) {
    return {
      code: "fetch-collection-error",
      message:
        error instanceof Error ? error.message : "Failed to fetch collection",
    };
  }
}
