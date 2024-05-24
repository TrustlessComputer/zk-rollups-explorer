<!-- eslint-disable vue/valid-v-for -->
<template>
  <Table class="batches-table" :class="{ loading }" :items="batchesWrapper" :loading="loading">
    <template v-if="batches?.length || loading" #table-head>
      <TableHeadColumn v-if="columns.includes('status')">{{ t("batches.table.status") }}</TableHeadColumn>
      <TableHeadColumn v-if="columns.includes('txnBatch')">{{ t("batches.table.txnBatch") }}</TableHeadColumn>
      <TableHeadColumn v-if="columns.includes('size')">{{ t("batches.table.size") }}</TableHeadColumn>
      <TableHeadColumn v-if="columns.includes('age')">{{ t("batches.table.age") }}</TableHeadColumn>
    </template>
    <template #loading>
      <tr class="loader-row" v-for="item in loadingRows" :key="item">
        <TableBodyColumn v-for="(, index) in 4" :key="`col-${index}`" class="loader-col">
          <ContentLoader />
        </TableBodyColumn>
      </tr>
    </template>
    <template #table-row="{ item }: { item: any }">
      <TableBodyColumn v-if="columns.includes('status')" :data-heading="t('batches.table.status')">
        <div class="status-badge-container">
          <Badge color="dark-success" :data-testid="$testId.statusBadge">
            <template #default>
              {{ te(`batches.status.${item.status}`) ? t(`batches.status.${item.status}`) : item.status }}
              <component :is="'div'">
                &nbsp;
                {{ getBadgeIconByStatus(item.status) }}
              </component>
            </template>
          </Badge>
        </div>
      </TableBodyColumn>
      <TableBodyColumn v-if="columns.includes('txnBatch')" :data-heading="t('batches.table.txnBatch')">
        <router-link :to="{ name: 'batch', params: { id: item.number } }"> #{{ item.number }} </router-link>
      </TableBodyColumn>
      <TableBodyColumn v-if="columns.includes('size')" :data-heading="t('batches.table.size')">
        <router-link :to="{ name: 'batch', params: { id: item.number, scrollToTxns: true } }">
          {{ item.l1TxCount + item.l2TxCount }}
        </router-link>
      </TableBodyColumn>
      <TableBodyColumn v-if="columns.includes('age')" :data-heading="t('batches.table.age')">
        <CopyButton :value="utcStringFromISOString(item.timestamp)">
          <TimeField :value="item.timestamp" :show-exact-date="false" />
        </CopyButton>
      </TableBodyColumn>
    </template>
    <template #empty>
      <TableBodyColumn class="batches-not-found" :colspan="4">
        <slot name="not-found">{{ t("batches.table.notFound") }}</slot>
      </TableBodyColumn>
    </template>
    <template v-if="$slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </Table>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import Badge from "@/components/common/Badge.vue";
import CopyButton from "@/components/common/CopyButton.vue";
import ContentLoader from "@/components/common/loaders/ContentLoader.vue";
import Table from "@/components/common/table/Table.vue";
import TableBodyColumn from "@/components/common/table/TableBodyColumn.vue";
import TableHeadColumn from "@/components/common/table/TableHeadColumn.vue";
import TimeField from "@/components/common/table/fields/TimeField.vue";

import type { BatchListItem } from "@/composables/useBatches";
import type { BatchStatus } from "@/composables/useBatchesEnhance";
import type { PropType } from "vue";

import { utcStringFromISOString } from "@/utils/helpers";

const { t, te } = useI18n();

const props = defineProps({
  batches: {
    type: Array as PropType<BatchListItem[]>,
    default: () => [],
  },
  batcheStatus: {
    type: Object as PropType<BatchStatus>,
    default: () => {
      return {
        pending: 0,
        pendingJob: [],
        sending: 0,
        sendingJob: [],
        success: 0,
        successJob: [],
      };
    },
  },
  loading: {
    type: Boolean,
    default: true,
  },
  loadingRows: {
    type: Number,
    default: 10,
  },
  columns: {
    type: Array as PropType<string[]>,
    default: () => ["status", "txnBatch", "size", "age"],
  },
});

const pendingJobsByBatchNumbers = computed(() => {
  if (props.batcheStatus.pendingJob && props.batcheStatus.pendingJob.length > 0) {
    return props.batcheStatus.pendingJob.map((item) => item.batchNumber);
  }
  return [];
});

const sendingJobsByBatchNumbers = computed(() => {
  if (props.batcheStatus.sendingJob && props.batcheStatus.sendingJob.length > 0) {
    return props.batcheStatus.sendingJob.map((item) => item.batchNumber);
  }
  return [];
});

const successJobByBatchNumbers = computed(() => {
  if (props.batcheStatus.successJob && props.batcheStatus.successJob.length > 0) {
    return props.batcheStatus.successJob.map((item) => item.batchNumber);
  }
  return [];
});

// console.log("Batches Table ", props);
// console.log("Local Props ", {
//   pendingJobsByBatchNumbers,
//   sendingJobsByBatchNumbers,
//   successJobByBatchNumbers,
// });

const batchesWrapper = computed(() => {
  return props.batches
    ? props.batches.map((item) => {
        // console.log("ITEM ==== ", item);
        let status = item.status;
        if (status !== "sealed") {
          //Detail status on Bitcoin
          if (pendingJobsByBatchNumbers.value.includes(String(item.number))) {
            status = "verified_pending_on";
          } else if (sendingJobsByBatchNumbers.value.includes(String(item.number))) {
            status = "verified_sending_on";
          } else if (successJobByBatchNumbers.value.includes(String(item.number))) {
            status = "verified";
          } else {
            status = "";
          }
        }
        return {
          ...item,
          status,
        };
      })
    : [];
});

function getBadgeIconByStatus(status: BatchListItem["status"]) {
  if (status === "sealed") {
    // return "RuneChain"
    return "BVM";
  } else {
    // Status Batch detail mapper (new code)
  }
  // return "BVM"
  return "Bitcoin";
}
</script>

<style lang="scss">
.batches-table {
  &.loading {
    .table-body td::before {
      @apply opacity-30;
    }
  }
  td {
    @apply py-2 md:py-3.5;
  }
  .status-badge {
    .badge-dot {
      @apply h-1.5 w-1.5 rounded-full bg-current;
    }
  }

  .table-body {
    @apply rounded-t-lg;

    td {
      @apply relative flex flex-col items-end justify-end whitespace-normal text-right md:table-cell md:text-left;

      &:before {
        @apply absolute left-4 top-2 whitespace-nowrap pr-5 text-left text-xs uppercase text-neutral-400 content-[attr(data-heading)] md:content-none;
      }
    }
  }
  .external-link-icon {
    @apply ml-1 inline-block w-5 align-sub;
  }
  td.batches-not-found {
    @apply my-0 table-cell items-start justify-start bg-white p-4 text-left text-gray-700;
  }
  .copy-button-container {
    @apply flex w-fit;
    .copy-button {
      @apply static p-0 focus:ring-0;
    }
  }
  .badge-content {
    @apply flex items-center;

    svg {
      @apply ml-1;
    }
  }
  .badge-container.type-label {
    @apply pr-2 normal-case	normal-case;
  }
}
</style>
