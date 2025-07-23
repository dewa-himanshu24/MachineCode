import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Pagination from './Component/Pagination';

// Define the product type based on the API response
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<ProductResponse>('https://dummyjson.com/products');
      setProducts(response.data.products);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <div className="App">
      <h1>Product List</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <Pagination products={products}/>
    </div>
  );
}

export default App;
