import useSWR from 'swr';
import AxiosClient from './base';
import { serialize } from 'utils/string';

const productApi = {
  getProductsByUser: () => {
    return AxiosClient('/product/getAll', {
      method: 'GET',
    });
  },
};

export const useGetAllProductByUser = filter => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/v1/product/get-products-in-category/${filter.category}?${serialize({
      ...filter,
    })}`,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
    },
  );

  return {
    data: data?.data || null,
    error,
    isLoading,
    mutate,
  };
};

export default productApi;
