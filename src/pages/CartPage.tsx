import { motion } from "framer-motion";
import CartProductItem from "../components/CartProductItem";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart } = useCart();

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
                <CartProductItem key={item.id} {...item} />
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
