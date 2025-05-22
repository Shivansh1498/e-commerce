import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      <Navbar />
      <main
        role="main"
        aria-label="Main content area"
        className="flex-grow p-4"
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <footer
        className="bg-gray-100 text-center py-4 text-sm"
        role="contentinfo"
        aria-label="Footer"
      >
        <p>&copy; {new Date().getFullYear()} Store. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
