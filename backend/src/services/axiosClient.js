import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.SMS_API_URL || "https://api.example.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("External API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);
