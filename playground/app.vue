<script setup lang=ts>
import { ref, onMounted } from 'vue'
import { collection, getDoc, doc } from 'firebase/firestore'
import { useNuxtApp } from 'nuxt/app';
import { useDocumentHistory } from './.nuxt/imports';

const fstore = useNuxtApp().$firestore as any
const {list} = useDocumentHistory(fstore)

const col = 'cms_v3';
const docId = 'goOwCurNlg8UQZrrvKIg';

const docData = ref({
} as any);

const docHistory = ref([] as any[])

onMounted(() => {
  const db = collection(fstore, col)
  getDoc(doc(db, docId)).then((snap) => {
    docData.value = snap.data()
  })
  list(docId).then((res)=>{
    docHistory.value = res;
  })
})

function onRestoreVersion(id: string){
  docData.value.versionId = id;
}

</script>
<template>
  <v-app>
    <v-main>
      <v-container>
        <DocumentHistoryListItem
          v-for="item in docHistory"
          :key="item.id"
          :item="item"
          :current-version="item.id===docData.versionId"
          @restore:success="onRestoreVersion"
        ></DocumentHistoryListItem>
      </v-container>
    </v-main>
  </v-app>
</template>
