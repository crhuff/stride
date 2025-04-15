import { useFetchData } from "../fetcher/fetcher";
import { Provider } from "./providers.type";

const useGetProviders = () =>
  useFetchData<Provider[]>({
    route: `providers`,
  });

export { useGetProviders };
