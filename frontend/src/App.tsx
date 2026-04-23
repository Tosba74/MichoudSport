import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import Promotions from "./pages/Promotions";
import Rental from "./pages/Rental";
import Checkout from "./pages/Checkout";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/boutique" element={<Catalog />} />
          <Route path="/boutique/:universe" element={<Catalog />} />
          <Route path="/produits/:slug" element={<ProductDetail />} />
          <Route path="/promos" element={<Promotions />} />
          <Route path="/location" element={<Rental />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
