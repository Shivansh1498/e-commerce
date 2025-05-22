import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className="bg-white shadow sticky top-0 z-50"
      aria-label="Site Header"
    >
      <nav
        className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center"
        role="navigation"
      >
        <Link to="/" className="text-xl font-bold" aria-label="Go to home page">
          Store
        </Link>
        <Link
          to="/cart"
          className="relative inline-flex items-center justify-center px-3 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-100"
          aria-label="View cart"
        >
          View Cart
          {cartCount > 0 && (
            <span
              className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full"
              aria-label={`${cartCount} items in cart`}
              role="status"
            >
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
