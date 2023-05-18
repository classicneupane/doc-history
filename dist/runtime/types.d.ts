export interface DocHistoryParams {
    id: string;
    docCollection: string;
    data: any;
    docUserEmail?: string;
}
export interface DocActivity {
    appliedAt: Date;
}
export interface DocHistory {
    docId: string;
    docCollection: string;
    docUpdatedAt: Date;
    docApp: string;
    docUserEmail: string;
    docActivity: DocActivity[];
}
export interface DocHistoryFirestore {
    id: string;
    data: DocHistory;
}
