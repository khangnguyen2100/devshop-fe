import authApi from 'api/authApi';
import axios from 'axios';

const getToken = () =>
  typeof window !== 'undefined'
    ? localStorage.getItem('access_token') ?? ''
    : null;

const getAuthorizationHeader = () => `Bearer ${getToken()}`;
console.log('process.env.NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);

const AxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'content-type': 'application/json',
    Authorization: getAuthorizationHeader(),
  },
  paramsSerializer: params => Qs.stringify(params),
});

AxiosClient.interceptors.request.use(function (config) {
  if (config.headers) {
    config.headers['Authorization'] = getAuthorizationHeader();
  }
  return config;
});

AxiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  async function (error) {
    if (error.response.status === 404) {
      return error.response.status;
    }
    const originalRequest = error.config;
    if (
      (error.code === 'ERR_NETWORK' ||
        (error.code === 'ERR_BAD_REQUEST' && error.response.status === 401)) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const response = await authApi.refreshToken();
      if (response.status === 200) {
        localStorage.setItem(
          LOCAL_STORAGE_KEY.ACCESS_TOKEN,
          response.metadata.accessToken,
        );
        AxiosClient.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.refreshToken}`;
        originalRequest.headers = {
          Authorization: `Bearer ${response.data.refreshToken}`,
        };
        return axios(originalRequest);
      } else {
        return Promise.reject(error);
      }
    }
    // if(error.response.status === 409){
    //     console.log("user not found");
    // }
    return Promise.reject(error);
  },
);

export default AxiosClient;
