
interface ProductCardProps {
  image: string;
  title: string;
}

const ProductCard = ({image, title}: ProductCardProps) => {
  return (
    <div> 
      <div className="product-card">
        <img src={image} alt={title} className='product-img' />
        <span>{title}</span>
      </div>
    </div>
  )
}

export default ProductCard