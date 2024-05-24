import useFetch from "@/composables/common/useFetch";
// import useFetchCollection from "@/composables/common/useFetchCollection";
import useContext from "@/composables/useContext";

export type BatchStatus = Api.Response.BatchStatus;

// export default (context = useContext()) => {
//   return useFetchCollection<Api.Response.BatchListItem>(
//     new URL(`/batches?toDate=${new Date().toISOString()}`, context.currentNetwork.value.apiUrl)
//   );
// };

export default (context = useContext()) => {
  return useFetch<Api.Response.BatchStatus>(() => new URL("https://testnet.runechain.com/status"));
};
