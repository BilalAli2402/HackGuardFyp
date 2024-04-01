import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/api/',
  // Any other custom settings
});


axiosInstance.interceptors.request.use(
    (config) => {
      // List of endpoints that don't require the Authorization header
      const noAuthRequired = ['login/', 'signup/'];
      
      // Check if the current request's URL is in the list
      const requiresNoAuth = noAuthRequired.some(path => config.url.endsWith(path));
  
      if (!requiresNoAuth) {
        // Add token to headers if the request requires authentication
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );
  
// Response Interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem('refreshToken');
      try {
        // Attempt to get a new access token using the refresh token
        const response = await axiosInstance.post('token/refresh/', { refresh });
        localStorage.setItem('accessToken', response.data.access);
        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Unable to refresh token:', refreshError);
        // Handle token refresh error (e.g., redirect to login)
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

  export default axiosInstance;