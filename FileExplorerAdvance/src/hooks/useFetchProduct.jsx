import React, { useEffect, useState } from 'react';

function useFetchProduct(page) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function getProducts(page, signal) {

    try {
      setLoading(true);
      const limit = 10;
      const skip = (page - 1) * limit;
      const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`, signal);
      const jsonResponse = await response.json();

      const productData = jsonResponse?.products;

      setProducts((prev) => {
        const updatedProduct = [...prev, ...productData];

        if (updatedProduct.length >= jsonResponse?.total) {
          setHasMore(false);
        }

        return updatedProduct;
      })

    } catch (err) {
      console.log('Failed to fetch product');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    getProducts(page, signal);

    return () => {
      controller.abort();
    }
  }, [page]);

  return {
    products,
    loading,
    hasMore
  }
}

export default useFetchProduct;