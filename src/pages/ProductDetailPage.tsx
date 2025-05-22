import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err?.message);
        setError("Product not found.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-4">Loading product...</p>;
  if (error || !product)
    return <p className="p-4 text-red-500">{error || "Product not found."}</p>;

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto p-4"
    >
      <main
        className="max-w-4xl mx-auto p-4"
        aria-label={`Details for ${product.title}`}
      >
        <Link
          to="/"
          className="text-sm text-blue-600 hover:underline mb-4 inline-block"
          aria-label="Back to home"
        >
          &larr; Back to products
        </Link>

        <article className="grid md:grid-cols-2 gap-8 mt-4" role="region">
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-contain border rounded"
            />
          </div>

          <div>
            <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-xl font-bold text-green-700 mb-6">
              ${product.price}
            </p>

            <button
              onClick={() => addToCart({ ...product, quantity: 1 })}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              aria-label={`Add ${product.title} to cart`}
            >
              Add to Cart
            </button>
          </div>
        </article>
      </main>
    </motion.main>
  );
};

export default ProductDetailPage;
