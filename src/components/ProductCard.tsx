import { Link } from "react-router-dom";
import type { Product } from "../pages/HomePage";

const ProductCard = ({ id, title, image, price }: Product) => {
  return (
    <article
      className="border rounded-lg p-4 shadow hover:shadow-md transition"
      aria-label={`Product: ${title}`}
    >
      <Link to={`/product/${id}`} aria-label={`View details for ${title}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-contain mb-2"
        />
        <h3 className="text-sm font-medium mb-1">{title}</h3>
        <p className="font-semibold text-gray-700">${price}</p>
      </Link>
    </article>
  );
};

export default ProductCard;
