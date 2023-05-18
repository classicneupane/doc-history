export interface DocHistoryParams {
  id: string;
  docCollection: string;
  data: any;
  docUserEmail?: string;
}


export interface DocHistory{
  docId: string
  docCollection: string
  docUpdatedAt: Date
  docApp: string
  docUserEmail: string
  docAppliedAt: Date
}

export interface DocHistoryFirestore{
  id: string
  data: DocHistory
}