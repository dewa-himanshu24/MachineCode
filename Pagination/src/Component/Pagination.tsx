import React, {useState} from 'react';
import ProductCard from './ProductCard';

const PAGE_SIZE = 5;

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface PaginationProps {
  products: Product[];
}

const Pagination = ({ products }: PaginationProps) => {

  const [currentPage, setCurrentPage] = useState<number>(0);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);
  let start = currentPage * PAGE_SIZE;
  let end = start + PAGE_SIZE;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  return (
    <div>      <div className='pagination'>
    <span className='page' onClick={handlePrevPage}>Prev</span>
  {[...Array(totalPages).keys()].map((page) => (<span className={`page ${page === currentPage ? 'active' : ''}`} onClick={() => setCurrentPage(page)}>{page+1}</span>))}
    <span className='page' onClick={handleNextPage}>Next</span> 
  </div>
  <div className='products-container'>
    {products.slice(start, end).map((product) => (
      <ProductCard key={product.id} image={product.thumbnail} title={product.title} />
    ))}
  </div></div>
  )
}

export default Pagination