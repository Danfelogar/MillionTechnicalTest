import axios, {type AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';

/**
 * Configuration object for axios instance, including base URL and request timeout.
 */
const axiosConfig: AxiosRequestConfig = {
  baseURL: Config.BASE_URL,
  timeout: 5000, // Timeout set to 5000 milliseconds (5 seconds)
};

/**
 * Axios instance configured for crypto API calls.
 */
export const cryptoApi = axios.create(axiosConfig);
