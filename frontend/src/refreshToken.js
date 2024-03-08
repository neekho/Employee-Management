import apiService from "./apiService";

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await apiService.post("/token", { refreshToken });
    const newAccessToken = response.data.accessToken;

    // Update the stored access token
    localStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Token refresh failed", error);
    // Handle token refresh failure, e.g., logout the user
  }
};

export default refreshAccessToken;
