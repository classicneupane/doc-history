import { Firestore } from "firebase/firestore";
import { DocHistoryParams } from '../types';
export declare function useDocumentHistory(firestore: Firestore): {
    addDocHistory: ({ id, docCollection, data, docUserEmail, }: DocHistoryParams) => void;
    list: (id: string) => Promise<any[]>;
    restoreVersion: (id: string) => Promise<void>;
};
