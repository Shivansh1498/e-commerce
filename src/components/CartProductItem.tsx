import { useCart } from "../context/CartContext";
import type { CartItem } from "../pages/HomePage";

const CartProductItem = ({ id, image, title, price, quantity }: CartItem) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <li
      className="flex flex-col sm:flex-row items-center justify-between gap-4 border p-4 rounded"
      aria-label={`Cart item: ${title}`}
    >
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={title}
          className="w-20 h-20 object-contain border rounded"
        />
        <div>
          <h2 className="font-medium">{title}</h2>
          <div
            className="flex items-center gap-2 mt-2"
            aria-label="Quantity controls"
          >
            <button
              onClick={() =>
                quantity > 1
                  ? updateQuantity(id, quantity - 1)
                  : removeFromCart(id)
              }
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              aria-label={`Decrease quantity of ${title}`}
            >
              −
            </button>
            <span aria-live="polite">{quantity}</span>
            <button
              onClick={() => updateQuantity(id, quantity + 1)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
              aria-label={`Increase quantity of ${title}`}
            >
              +
            </button>
          </div>
          <p className="font-semibold mt-1">${(price * quantity).toFixed(2)}</p>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(id)}
        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
        aria-label={`Remove ${title} from cart`}
      >
        Remove
      </button>
    </li>
  );
};

export default CartProductItem;
