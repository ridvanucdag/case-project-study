import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Header from './pages/Header/Header';
import ProductDetail from './pages/ProductDetail/ProductDetail';


const App: React.FC = () => {
  return (
    <div >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;