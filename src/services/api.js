import axios from "axios";
import { AsyncStorage } from 'react-native';
import { baseUrl } from '../config';

const api = axios.create({
  baseURL: baseUrl,
});

AsyncStorage.getItem('@dashboardApp:token')
  .then(token => api.defaults.headers['Authorization'] = `Bearer ${token}`)
  .catch(() => delete api.defaults.headers['Authorization']);

export default api;