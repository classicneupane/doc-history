<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDoc, doc } from 'firebase/firestore'
import { useNuxtApp } from 'nuxt/app';

const fstore = useNuxtApp().$firestore

const col = 'cms_v3';
const docId = 'goOwCurNlg8UQZrrvKIg';

const docData = ref({
});

onMounted(() => {
  const db = collection(fstore, col)
  getDoc(doc(db, docId)).then((snap) => {
    docData.value = snap.data()
  })
})

</script>
<template>
  <v-app>
    <v-main>
      <v-container>
        <DocumentHistory :doc-id="docId" :current-version-id="docData.versionId">
          <template #display="{ item }">
            {{ item.data.html }}
          </template>
        </DocumentHistory>
      </v-container>
    </v-main>
  </v-app>
</template>
