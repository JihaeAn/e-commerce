import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AdminLayout from './components/admin/AdminLayout';
import ScrollToTop from './components/ScrollToTop';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

import MainPage from './pages/MainPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import OrderComplete from './pages/OrderPage/OrderComplete';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import MyPage from './pages/MyPage';
import Dashboard from './pages/admin/Dashboard';
import ItemList from './pages/admin/ItemList';
import ItemCreate from './pages/admin/ItemCreate';
import UserList from './pages/admin/UserList';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          {/* Admin */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="items" element={<ItemList />} />
            <Route path="items/new" element={<ItemCreate />} />
            <Route path="users" element={<UserList />} />
          </Route>

          {/* Auth (no header/footer) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Main layout */}
          <Route element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/order/complete" element={<OrderComplete />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
