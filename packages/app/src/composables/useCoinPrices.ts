/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from "vue";

import { $fetch, FetchError } from "ohmyfetch";

import useContext from "@/composables/useContext";

let isRequestFinished = false;
let isRequesting = false;
let coinsPrice: any;

export type ICoinPrice = {
  [key: string]: string;
};

export default (context = useContext()) => {
  const isRequestPending = ref(false);
  const isRequestFailed = ref(false);

  const fetchCoinPrices = async () => {
    if (!isRequestFinished && !isRequesting) {
      isRequesting = true;
      isRequestPending.value = true;
      isRequestFailed.value = false;
      try {
        const respone = await $fetch(`${new URL(`${context.currentNetwork.value.bvmApiUrl}/api/coin-prices`)}`);
        coinsPrice = respone.result || {};
      } catch (error: unknown) {
        coinsPrice = null;
        if (!(error instanceof FetchError) || error.response?.status !== 404) {
          isRequestFailed.value = true;
        }
      } finally {
        isRequestPending.value = false;
        isRequestFinished = true;
      }
    }
  };
  return {
    fetchCoinPrices,
    coinsPrice,
    isRequestPending,
    isRequestFailed,
  };
};
