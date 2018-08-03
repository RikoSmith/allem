import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://api.allem.kz/api/',
  timeout: 10000
});
