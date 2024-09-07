import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductList from './components/ProductList';
import { ProductProvider } from './contexts/ProductContext';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import PrivateRoute from './routes/PrivateRoute';
import Footer from './components/Footer';
import Blog from './pages/Blog';
import GoogleCallback from './pages/GoogleCallback';

function App() {
  return (
    <ProductProvider>
      <Router>
      <Navbar />
      <div className="container mx-auto px-4 py-8 mb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/login/callback" element={<GoogleCallback />} />
          <Route
          path="/product/:productId"
          element={<PrivateRoute element={ProductDetails} />} 
        />
        <Route
          path="/cart"
          element={<PrivateRoute element={Cart} />}
        />
        </Routes>
      </div>
      <Footer />
    </Router>
    </ProductProvider>
  );
}

export default App;
