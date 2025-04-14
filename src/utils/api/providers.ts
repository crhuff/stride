import { getApiData } from "../fetcher/fetcher";
import { Provider } from "./providers.type";

const getProviders = async (): Promise<Provider[]> => {
  try {
    return await getApiData<undefined, Provider[]>(`providers`, 'GET', undefined);
  } catch (err) {
    console.log('getProviders: ', err)
    throw err;
  }
};
    
export {
  getProviders,
};
