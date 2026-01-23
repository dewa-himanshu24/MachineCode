import React, { useEffect, useState } from 'react';

function useFetchProduct(page) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  async function getProducts() {

    try {
      setLoading(true);
      const skip = (page - 1) * limit;
      const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
      const jsonResponse = await response.json();
            console.log('~jsonResponse', jsonResponse);


      const productData = jsonResponse?.products;
      console.log('~productData', productData);

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

    getProducts(page);
  }, [page]);

  return {
    products,
    loading,
    hasMore
  }
}

export default useFetchProduct;