import AxiosClient from './base';

const authApi = {
  refreshToken: async () => {
    return AxiosClient('/auth/refresh-token', {
      method: 'GET',
    });
  },
};
export default authApi;
