import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor for adding the bearer token
axiosInstance.interceptors.request.use(
    (config) => {
        const existingAuth = config.headers?.Authorization;
        if (!existingAuth) {
            const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const PUBLIC_AUTH_PATHS = [
    "/auth/admin-login",
    "/auth/forget-password",
    "/auth/resend-otp",
    "/auth/verify-account",
    "/auth/reset-password",
];

// Response interceptor for handling 401 errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const requestUrl = String(error.config?.url || "");
            const isPublicAuth = PUBLIC_AUTH_PATHS.some((path) =>
                requestUrl.includes(path)
            );

            if (!isPublicAuth && typeof window !== "undefined") {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
