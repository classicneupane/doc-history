<script setup lang="ts">
import { ref } from 'vue'
import { DocHistoryFirestore } from '../types';
import moment from 'moment'
import { useDocumentHistory } from '../composables/useDocumentHistory';
import { useNuxtApp } from 'nuxt/app';

const props = defineProps<{
    item: DocHistoryFirestore
    currentVersion?: boolean
    theme?: 'light' | 'dark'
}>()

const dialogs = ref({
    comparision: false,
    restore: false
})

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
function showConfirm(item:any) {
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
    const {$firestore} = useNuxtApp() as any;
    const { restoreVersion } = useDocumentHistory($firestore)

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
    // return item.id === props.currentVersionId
    return props.currentVersion
}

</script>
<template>
    <div
        class="dh-list-item"
        :class="isActiveVersion(item) ? `_dh-list-item-active-${theme || 'light'}` : ''"
     >
        <slot name="item" :item="item">
            <div class="dh-list-item-content">
                <slot name="display" :item="item">
                    {{ item }}
                </slot>
            </div>
            <slot name="action" :restore="restore" :item="item">
                <div class="mt-2">
                    <v-btn v-if="!isActiveVersion(item)" variant="tonal" rounded size="small"
                        :loading="resotreData.id === item.id && resotreData.loading" color="primary" class="text-none mx-1"
                        @click="restore(item)">
                        Restore <v-icon class="ml-1">
                            mdi-restore
                        </v-icon>
                    </v-btn>
                    <v-chip v-if="isActiveVersion(item)" variant="flat" color="primary" clas="mx-1">
                        Current Version
                    </v-chip>
                    <v-chip color="info" class="mx-1">
                        {{ fromNow(parseDate(item.data.docUpdatedAt)) }}
                    </v-chip>
                </div>
            </slot>
        </slot>

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