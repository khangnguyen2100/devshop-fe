import { useEffect, useState } from 'react';
import { getProductsByCategory, getProductsBySearch } from '../utils/shopUtils';

export default function useProductData(productData, category, query) {
  const [data, setData] = useState(productData);

  useEffect(() => {
    const product = query
      ? getProductsBySearch(getProductsByCategory(productData, category), query)
      : getProductsByCategory(productData, category);
    setData(product);
    setData(product);
  }, [category, query]);

  return data;
}
