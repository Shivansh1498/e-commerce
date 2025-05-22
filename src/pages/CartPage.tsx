import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto p-4"
    >
      <main className="max-w-4xl mx-auto p-4" aria-label="Cart page">
        <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

        {cart.length === 0 ? (
          <p aria-live="polite">Your cart is empty.</p>
        ) : (
          <section aria-label="Cart item list">
            <ul className="space-y-6">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 border p-4 rounded"
                  aria-label={`Cart item: ${item.title}`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-contain border rounded"
                    />
                    <div>
                      <h2 className="font-medium">{item.title}</h2>
                      <div
                        className="flex items-center gap-2 mt-2"
                        aria-label="Quantity controls"
                      >
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? updateQuantity(item.id, item.quantity - 1)
                              : removeFromCart(item.id)
                          }
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          aria-label={`Decrease quantity of ${item.title}`}
                        >
                          −
                        </button>
                        <span aria-live="polite">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          aria-label={`Increase quantity of ${item.title}`}
                        >
                          +
                        </button>
                      </div>
                      <p className="font-semibold mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <footer
              className="mt-8 border-t pt-4 text-right space-y-1"
              aria-label="Cart summary"
            >
              <p>
                Total Items: <strong>{totalItems}</strong>
              </p>
              <p>
                Total Price: <strong>${totalPrice}</strong>
              </p>
            </footer>
          </section>
        )}
      </main>
    </motion.main>
  );
}
