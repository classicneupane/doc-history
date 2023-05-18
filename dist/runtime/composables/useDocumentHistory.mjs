import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore";
import { useAppConfig } from "#imports";
export function useDocumentHistory(firestore) {
  const opts = useAppConfig().documentHistory;
  const db = collection(firestore, opts.collection);
  function addDocHistory({
    id,
    docCollection,
    data,
    docUserEmail
  }) {
    let userEmail = "";
    try {
      userEmail = localStorage.getItem("userEmail") || "";
    } catch {
    }
    const docHistoryMetadata = {
      docUpdatedAt: /* @__PURE__ */ new Date(),
      docId: id,
      docCollection,
      docApp: opts?.app || "",
      docUserEmail: userEmail || docUserEmail || ""
    };
    const dataFormatted = {
      ...data || {},
      ...docHistoryMetadata,
      docHistoryMetadata
    };
    addDoc(db, dataFormatted).then(() => {
      console.log("doc history added");
    }).catch((err) => {
      console.error(err);
    });
  }
  async function list(id) {
    const snap = await getDocs(query(db, where("docId", "==", id)));
    const res = [];
    snap.forEach((i) => {
      res.push({ id: i.id, data: i.data() });
    });
    res.sort((a, b) => {
      const t = (d) => d.data.docUpdatedAt.toDate().getTime();
      try {
        return t(b) - t(a);
      } catch {
        return 0;
      }
    });
    return res;
  }
  async function restoreVersion(id) {
    const collectionFactory = (col) => {
      return col ? collection(firestore, col) : db;
    };
    const getData = async (col, id2) => {
      const dbCol = collectionFactory(col);
      const data = await getDoc(doc(dbCol, id2));
      return {
        ...data.data()
      };
    };
    const versionData = await getData("", id);
    const newData = { ...versionData, versionId: id };
    console.log(versionData.docCollection);
    await updateDoc(
      doc(
        collectionFactory(versionData.docCollection),
        versionData.docId
      ),
      newData
    );
  }
  return {
    addDocHistory,
    list,
    restoreVersion
  };
}
