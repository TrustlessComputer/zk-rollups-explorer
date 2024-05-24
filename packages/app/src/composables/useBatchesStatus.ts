import { computed } from "vue";
import { useI18n } from "vue-i18n";

import useBatchesEnhance from "./useBatchesEnhance";

export type UseBatchesStatusParams = {
  batchItem?: any;
  batchNumer?: number | string;
};

export default (params: UseBatchesStatusParams) => {
  const { batchItem, batchNumer } = params;
  const {
    fetch: getBatchesEnhance,
    pending: isBatchesStatusPending,
    failed: isBatchesStatusFailed,
    item: batchStatus,
  } = useBatchesEnhance();
  const { t } = useI18n();

  getBatchesEnhance();

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

  const pendingJobs = computed(() => {
    if (batchStatus?.value?.pendingJob && batchStatus?.value.pendingJob?.length > 0) {
      return batchStatus?.value?.pendingJob;
    }
    return [];
  });

  const sendingJobs = computed(() => {
    if (batchStatus?.value?.sendingJob && batchStatus?.value?.sendingJob.length > 0) {
      return batchStatus?.value?.sendingJob;
    }
    return [];
  });

  const successJob = computed(() => {
    if (batchStatus?.value?.successJob && batchStatus?.value?.successJob?.length > 0) {
      return batchStatus?.value?.successJob;
    }
    return [];
  });

  const txHashPendingBitcoin = computed(() => {
    return pendingJobs.value.find((item) => item.batchNumber === String(batchNumer || -1));
  });
  const txHashSendingBitcoin = computed(() => {
    return sendingJobs.value.find((item) => item.batchNumber === String(batchNumer || -1));
  });
  const txHashSucessBitcoin = computed(() => {
    return successJob.value.find((item) => item.batchNumber === String(batchNumer || -1));
  });

  const txHashBitcoinExist = computed(() => {
    if (txHashPendingBitcoin.value) {
      return txHashPendingBitcoin.value.revealTxId;
    }
    if (txHashSendingBitcoin.value) {
      return txHashSendingBitcoin.value.revealTxId;
    }
    if (txHashSucessBitcoin.value) {
      return txHashSucessBitcoin.value.revealTxId;
    }
    return undefined;
  });

  const statusStr = computed(() => {
    if (txHashPendingBitcoin.value) {
      return t("batches.status.verified_pending_on");
    }
    if (txHashSendingBitcoin.value) {
      return t("batches.status.verified_sending_on");
    }
    if (txHashSucessBitcoin.value) {
      return t("batches.status.verified");
    }
    return batchItem?.status || undefined;
  });

  return {
    isBatchesStatusPending,
    isBatchesStatusFailed,
    displayedBatchesStatus,

    pendingJobs,
    sendingJobs,
    successJob,

    txHashPendingBitcoin,
    txHashSendingBitcoin,
    txHashSucessBitcoin,

    txHashBitcoinExist,
    statusStr,
  };
};
