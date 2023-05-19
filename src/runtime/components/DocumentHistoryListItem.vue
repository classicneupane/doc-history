<script setup lang="ts">
import { ref } from 'vue'
import { DocHistoryFirestore } from '../types';
import moment from 'moment'
import { useNuxtApp } from 'nuxt/app';
import { useDocumentHistory } from '../composables/useDocumentHistory';

const props = defineProps<{
    item: DocHistoryFirestore
    currentVersion?: boolean
    theme?: 'light' | 'dark'
}>()

const emit = defineEmits(['restore:success', 'restore:error'])

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
        emit("restore:success", item.id)
    }).catch(e=>{
      emit("restore:error", e)
    })
}

function isActiveVersion() {
    return props.currentVersion
}

</script>
<template>
  <div
    class="dh-list-item"
    :class="isActiveVersion() ? `_dh-list-item-active-${theme || 'light'}` : ''"
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
          <slot name="action-prepend"></slot>
          <v-btn
            v-if="!isActiveVersion()"
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
            v-if="isActiveVersion()"
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
          <slot name="action-append"></slot>
        </div>
      </slot>
    </slot>
  </div>
</template>

<style lang="scss">
@import "./colors.scss";

// .dh-list {
    .dh-list-item {
        padding: 20px;
        border-radius: 10px;
        border: 1px solid $border-color-light;
        margin-bottom: 10px;

        &:hover {
            border: 1px solid $border-color-active;
        }

        .dh-ts {
            // margin-top: 10px;
        }
    }

    .dh-list-item-active-light {
        background-color: $primary-hover;
        border: 1px solid $primary;
    }

    .dh-list-item-active-dark {
        background-color: $primary-hover-dark;
    }

// }
</style>