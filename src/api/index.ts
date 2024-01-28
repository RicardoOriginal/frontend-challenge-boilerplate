import axios from "axios";

const apiUrl = 'http://localhost:9000/invoice';

const headers = {
  'Content-Type': 'application/json',
  "traceLogId": Math.floor(Math.random() * 99999999) + 1
};

const corsConfig = {
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization'
};

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: headers,
  withCredentials: true,
  ...corsConfig
});

export default axiosInstance;
