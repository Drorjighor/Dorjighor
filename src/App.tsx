/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Account = lazy(() => import('./pages/Account'));
const Orders = lazy(() => import('./pages/Orders'));
const Checkout = lazy(() => import('./pages/Checkout'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const CustomTailoring = lazy(() => import('./pages/CustomTailoring'));
const ReturnExchange = lazy(() => import('./pages/ReturnExchange'));
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'));
const PaymentMethods = lazy(() => import('./pages/PaymentMethods'));
const OurStore = lazy(() => import('./pages/OurStore'));
const Careers = lazy(() => import('./pages/Careers'));
const Factory = lazy(() => import('./pages/Factory'));
const FAQ = lazy(() => import('./pages/FAQ'));
const TrackOrder = lazy(() => import('./pages/TrackOrder'));
const Addresses = lazy(() => import('./pages/Addresses'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const CompareProducts = lazy(() => import('./pages/CompareProducts'));
const ReturnRequest = lazy(() => import('./pages/ReturnRequest'));
const NotificationCenter = lazy(() => import('./pages/NotificationCenter'));
const Newsletter = lazy(() => import('./pages/Newsletter'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isReady } = useAuth();
  const location = useLocation();

  if (!isReady) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center px-6">
        <p className="text-xs uppercase tracking-widest font-black text-fab-text-muted">Loading account...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: { pathname: location.pathname } }} />;
  }

  return children;
}

function RouteLoading() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center px-6">
      <p className="text-xs uppercase tracking-widest font-black text-fab-text-muted">Loading page...</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Suspense fallback={<RouteLoading />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/our-store" element={<OurStore />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/factory" element={<Factory />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<TermsOfUse />} />
                    <Route path="/return-exchange" element={<ReturnExchange />} />
                    <Route path="/shipping-policy" element={<ShippingPolicy />} />
                    <Route path="/payment-methods" element={<PaymentMethods />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/track-order" element={<TrackOrder />} />
                    <Route path="/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
                    <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                    <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
                    <Route path="/compare-products" element={<CompareProducts />} />
                    <Route path="/return-request" element={<ReturnRequest />} />
                    <Route path="/notifications" element={<ProtectedRoute><NotificationCenter /></ProtectedRoute>} />
                    <Route path="/newsletter" element={<Newsletter />} />
                    <Route path="/custom-tailoring" element={<CustomTailoring />} />
                    <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                    <Route path="/account/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <WhatsAppButton />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}
