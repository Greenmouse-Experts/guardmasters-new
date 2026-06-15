import axios from "axios";
import { get_user_value, set_user_value, clear_user } from "@/store/authStore";
import { toast } from "sonner";

// export type ApiResponse<T = any> = BaseApiResponse<T>;

// export const new_url = "https://safeethix-crm-backend.onrender.com";
export const new_url = "https://guardmaster-institute-backend.onrender.com/v1/";
const apiClient = axios.create({
  baseURL: new_url,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token before each request
apiClient.interceptors.request.use((config) => {
  const user = get_user_value();
  if (user && user.accessToken) {
    config.headers.Authorization = `Bearer ${user.accessToken}`;
  }
  return config;
});

// Single simple refresh handler
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // If token expired and not already retried
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const user = get_user_value();
        if (!user) {
          throw new Error("User not found in store.");
        }
        const { data } = await axios.post(`${new_url}auth/refresh`, {
          refreshToken: user.refreshToken,
        });

        const newAccessToken = data.data.accessToken;
        const newRefreshToken = data.data.refreshToken;

        if (!newAccessToken || !newRefreshToken) {
          throw new Error("New access token not received.");
        }

        set_user_value({
          ...user,
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });

        // Update header and retry
        original.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(original);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        clear_user();
        toast.info("Session expired. Please log in again.", { duration: 1500 });
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
