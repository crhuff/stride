import { Options, useFetchData } from "../fetcher/fetcher";
import { Provider } from "./providers.type";

const useGetProviders = ({ options }: { options?: Options } = {}) =>
  useFetchData<Provider[]>({
    route: `providers`,
    options,
  });

export { useGetProviders };
