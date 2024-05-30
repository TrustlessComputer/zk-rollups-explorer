<template>
  <div>
    <div class="head-block">
      <Breadcrumbs :items="breadcrumbItems" />
      <SearchForm class="search-form" />
    </div>
    <h1>{{ t("batches.title") }}</h1>
    <div class="batches-container">
      <span v-if="failed" class="error-message">
        {{ t("failedRequest") }}
      </span>
      <BatchesTable
        v-else
        :loading="pending || isBatchesStatusPending"
        :loading-rows="pageSize"
        :batches="data ?? []"
        :batche-status="displayedBatchesStatus"
      >
        <template v-if="total && total > pageSize" #footer>
          <div class="pagination-container">
            <Pagination :active-page="page!" :total-items="total!" :page-size="pageSize" :disabled="pending" />
          </div>
        </template>
      </BatchesTable>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import SearchForm from "@/components/SearchForm.vue";
import BatchesTable from "@/components/batches/Table.vue";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/common/Breadcrumbs.vue";
import Pagination from "@/components/common/Pagination.vue";

import useBatches from "@/composables/useBatches";
import useBatchesEnhance from "@/composables/useBatchesEnhance";
import useContext from "@/composables/useContext";

const { t } = useI18n();
const { fetch: getBatchesEnhance, pending: isBatchesStatusPending, item: batchStatus } = useBatchesEnhance();

const context = useContext();
const route = useRoute();

const { load, pending, failed, data, total, pageSize, page } = useBatches(context);

const displayedBatchesStatus = computed(() => {
  return batchStatus.value
    ? batchStatus.value
    : {
        pending: 0,
        pendingJob: [],
        sending: 0,
        sendingJob: [],
        success: 0,
        successJob: [],
      };
});

const breadcrumbItems = computed((): BreadcrumbItem[] => [
  {
    text: t("breadcrumbs.home"),
    to: { name: "home" },
  },
  {
    text: `${t("batches.breadcrumbsTitle")}`,
  },
]);

watch(
  () => route.query.page,
  (page) => {
    const currentPage = page ? parseInt(page as string) : 1;
    load(currentPage, currentPage === 1 ? new Date() : undefined);
  },
  { immediate: true }
);

getBatchesEnhance();
</script>

<style lang="scss">
.head-block {
  @apply mb-8 flex flex-col-reverse justify-between lg:mb-10 lg:flex-row;

  .search-form {
    @apply mb-6 w-full max-w-[26rem] lg:mb-0;
  }
}
.batches-container {
  @apply mt-8;
  .table-body-col {
    @apply min-w-[120px];
  }
}
.pagination-container {
  @apply flex justify-center p-3;
}
</style>
