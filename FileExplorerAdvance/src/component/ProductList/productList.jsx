import { useCallback, useEffect, useState, useRef } from 'react';
import useFetchProduct from '../../hooks/useFetchProduct';

function ProductList({ }) {
  const [page, setPage] = useState(1);
  const { products, loading, hasMore } = useFetchProduct(page);

  const observer = useRef();

  const lastElementRef = useCallback((node) => {
    console.log('~node', node);
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev+1);
      }
    })

    if (node) observer.current.observe(node);

  }, [page, loading]);

  return (
    <div>
      <div>
        {products.map((item, idx) => {

          const isLastElement = products?.length === idx+1;

          return (
          <div
            ref={isLastElement ? lastElementRef : null}
          >{item?.title}</div>
        )})}
        {loading && <div>Fetching more products...</div>}
        {!hasMore && <div>No More Product to display</div>}
      </div>
    </div>
  )
}

export default ProductList;