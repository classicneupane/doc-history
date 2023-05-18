import {
  addDoc,
  collection,
  doc,
  documentId,
  Firestore,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { DocHistory, DocHistoryParams } from '../types'
import { useAppConfig } from '#imports'

export function useDocumentHistory(
  firestore: Firestore,
) {

  const opts = useAppConfig().documentHistory
  const db = collection(firestore, opts.collection);

  function addDocHistory({
    id,
    docCollection,
    data,
    docUserEmail,
  }: DocHistoryParams) {

    let userEmail = ''
    try {
      userEmail = localStorage.getItem("userEmail") || ''
    }
    catch {
      //
    }

    const docHistoryMetadata = {
      docUpdatedAt: new Date(),
      docId: id,
      docCollection: docCollection,
      docApp: opts?.app || "",
      docUserEmail: userEmail || docUserEmail || "",
    } as DocHistory;

    const dataFormatted = {
      ...(data || {}),
      ...docHistoryMetadata,
      docHistoryMetadata,
    };
    addDoc(db, dataFormatted)
      .then(() => {
        console.log("doc history added");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function list(id: string) {
    const snap = await getDocs(query(db, where('docId', '==', id)))
    const res = [] as any[]
    snap.forEach(i => {
      res.push({ id: i.id, data: i.data() })
    });

    res.sort((a: any, b: any) => {
      const t = (d: any) => d.data.docUpdatedAt.toDate().getTime()
      try {
        return t(b) - t(a);
      }
      catch {
        return 0
      }
    })

    return res;
  }

  async function restoreVersion(id: string) {
    const collectionFactory = (col: string) => {
      return col ? collection(firestore, col) : db;
    }
    const getData = async (col: string, id: string) => {
      const dbCol = collectionFactory(col)
      const data = await getDoc(doc(dbCol, id))
      return {
        ...data.data()
      }
    }

    const versionData = await getData('', id) as DocHistory
    const newData = { ...versionData, versionId: id }

    console.log(versionData.docCollection)
    await updateDoc(
      doc(
        collectionFactory(versionData.docCollection), versionData.docId
      ),
      newData
    )
  }

  return {
    addDocHistory,
    list,
    restoreVersion
  };
}
