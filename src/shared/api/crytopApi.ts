import axios, {type AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';

const axiosConfig: AxiosRequestConfig = {
  baseURL: Config.BASE_URL,
  timeout: 5000,
};

export const cryptoApi = axios.create(axiosConfig);
