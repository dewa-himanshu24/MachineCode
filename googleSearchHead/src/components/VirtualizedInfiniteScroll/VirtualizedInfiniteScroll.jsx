import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './VirtualizedInfiniteScroll.css';

const URL = 'https://dummyjson.com/products';
const LIMIT = 10;
const ITEM_HEIGHT = 60;
const CONTAINER_HEIGHT = 400;
const BUFFER = 5;

function VirtualizedInfiniteScroll() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [scrollTop, setScrollTop] = useState(0);

  const containerRef = useRef(null);
  const observerTarget = useRef(null);

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const response = await fetch(`${URL}?limit=${LIMIT}&skip=${skip}`);
      const result = await response.json();
      console.log('~result', result);

      if (result.products.length > 0) {
        setProducts(prev => [...prev, ...result.products]);
        setSkip(prev => prev + LIMIT);
      } else {
        setHasMore(false);
      }

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [skip, loading, hasMore]);

  useEffect(() => {
    if (!observerTarget.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        fetchData()
      }
    }, {
      root: containerRef.current,
      rootMargin: "100px",
      threshold: 0
    })

    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
    }
  }, [fetchData]);

  const totalListHeight = products.length * ITEM_HEIGHT;
  const startIdx = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER);
  const endIdx = Math.min(products.length, Math.ceil((scrollTop + CONTAINER_HEIGHT) / ITEM_HEIGHT) + BUFFER);

  const visibleItems = useMemo(() => {
    return products.slice(startIdx, endIdx).map((item, idx) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      absoluteIdx: startIdx + idx
    }))
  }, [products, startIdx, endIdx]);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  }

  return (
    <div className='container'>
      <h2>Virtualized Infinite Scroll ({products.length} items)</h2>
      <div className="scroll-container"
        ref={containerRef}
        onScroll={handleScroll}
        style={{
          height: CONTAINER_HEIGHT,
        }}>
        <div className="inner-content" style={{
          height: totalListHeight,
        }}>
          {visibleItems?.map(item => (
            <div className="item" style={{
              height: ITEM_HEIGHT,
              top: `${item.absoluteIdx * ITEM_HEIGHT}px`
            }}>{item?.title} - ${item.price}</div>
          ))}
        </div>

        {hasMore && (
          <div
            ref={observerTarget}
            style={{
              position: 'absolute',
              top: `${totalListHeight}px`,
              width: '100%',
              height: '20px',
              textAlign: 'center',
            }}
          >
            {loading ? 'Loading more...' : 'Scroll for more'}
          </div>
        )}

      </div>
    </div>
  )
}
export default VirtualizedInfiniteScroll;