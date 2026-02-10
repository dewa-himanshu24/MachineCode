import { useEffect, useState, useRef } from 'react';
import fakeSuggestion from '../fakeSuggestionAPI';

function useTypeHead(query) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const cache = useRef({});

  async function fetchData(query) {
    setLoading(true);
    try {
      const response = await fakeSuggestion(query);

      cache.current[query] = response;

      setSuggestions(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    if (cache.current[query]) {
      setSuggestions(cache.current[query]);
      return;
    }

    const timer = setTimeout(() => {
      fetchData(query)
    }, 500);
    
    return () => {
      clearTimeout(timer);
    }
  }, [query])

  return {
    suggestions,
    loading
  }
}

export default useTypeHead;