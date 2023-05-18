<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDocumentHistory } from '../composables/useDocumentHistory'
import moment from 'moment'
import { DocHistoryFirestore } from '../types'

const props = defineProps<{
    id: string,
    firestore: any
    currentVersionId: string
    theme?: 'light' | 'dark'
}>()

if (!props.firestore) {
    throw new Error("Firestore required")
}

const { list, restoreVersion } = useDocumentHistory(props.firestore)

const dialogs = ref({
    comparision: false,
    restore: false
})

const versions = ref([] as DocHistoryFirestore[] | any[])
const compare = ref([] as DocHistoryFirestore[])

async function fetchDocHistory() {
    versions.value = await list(props.id)
}

function addToCompare(item: DocHistoryFirestore) {
    compare.value.push(item)
}

function isInCompare(id: string) {
    return compare.value.some(i => i.id === id)
}

function parseDate(d: any) {
    try {
        return d.toDate()
    }
    catch {
        //
    }
    return 'Invalid Date'
}

function fromNow(d: Date) {
    try {
        return moment(d).fromNow(false)
    }
    catch {
        return d
    }
}

const restoreItem = ref({} as DocHistoryFirestore)
function showConfirm(item) {
    restoreItem.value = item
    dialogs.value.restore = true
}

function cancelRestore() {
    restoreItem.value = {} as DocHistoryFirestore
}

const resotreData = ref({
    id: '',
    loading: false
})
function restore(item: DocHistoryFirestore) {
    resotreData.value.id = item.id
    resotreData.value.loading = true

    restoreVersion(item.id).then(() => {
        resotreData.value.loading = false
    })
}

function isActiveVersion(item: DocHistoryFirestore, index?: number) {
    // if(!props.currentVersionId && index===0){
    //     return true
    // }
    return item.id === props.currentVersionId
}

onMounted(() => {
    fetchDocHistory()
})

</script>
<template>
  <div>
    <v-dialog
      v-model="dialogs.comparision"
      max-width="600"
      fullscreen
    >
      <v-card class="mx-auto w-100">
        <v-container>
          <v-row>
            <v-col
              v-for="i in compare"
              :key="i.id"
              cols="12"
              sm="6"
              md="4"
            >
              {{ i.data }}
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <!-- <v-dialog max-width="400" v-model="dialogs.restore">
            <v-card class="mx-auto w-100">
                <v-container>
                    <div class="my-3 text-h6">
                        Restore version?
                    </div>
                    <div>
                        <v-btn color="success" @click="restore()" class="mx-1" variant="tonal">Restore</v-btn>
                        <v-btn @click="cancelRestore()" class="mx-1" variant="text">Cancel</v-btn>
                    </div>
                </v-container>
            </v-card>
        </v-dialog> -->
    <!-- <div class="my-2">
            <v-btn color="primary" @click="dialogs.comparision = true">Comparision <v-icon>mdi-file-compare</v-icon></v-btn>
        </div> -->
    <div class="dh-list">
      <div
        v-for="(item, index) in versions"
        :key="item.id"
        class="dh-list-item"
        :class="isActiveVersion(item, index) ? `_dh-list-item-active-${theme || 'light'}` : ''"
      >
        <slot
          name="item"
          :item="item"
        >
          <div class="dh-list-item-content">
            <slot
              name="display"
              :item="item"
            >
              {{ item }}
            </slot>
          </div>
          <slot
            name="action"
            :restore="restore"
            :item="item"
          >
            <div class="mt-2">
              <v-btn
                v-if="!isActiveVersion(item)"
                variant="tonal"
                rounded
                size="small"
                :loading="resotreData.id === item.id && resotreData.loading"
                color="primary"
                class="text-none mx-1"
                @click="restore(item)"
              >
                Restore <v-icon class="ml-1">
                  mdi-restore
                </v-icon>
              </v-btn>
              <v-chip
                v-if="isActiveVersion(item)"
                variant="flat"
                color="primary"
                clas="mx-1"
              >
                Current Version
              </v-chip>
              <v-chip
                color="info"
                class="mx-1"
              >
                {{ fromNow(parseDate(item.data.docUpdatedAt)) }}
              </v-chip>
            </div>
          </slot>
        </slot>
        <!-- <div class="dh-ts mt-2"> </div> -->
      </div>
    </div>
  </div>
</template>

<style>
.dh-list .dh-list-item {
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(229, 233, 237, 0.605);
  margin-bottom: 10px;
}
.dh-list .dh-list-item:hover {
  border: 1px solid rgb(142, 145, 148);
}
.dh-list .dh-list-item-active-light {
  background-color: #f3f1f6;
  border: 1px solid #6200ee;
}
.dh-list .dh-list-item-active-dark {
  background-color: #424040;
}
</style>