import React, { useEffect } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import Cart from '../../components/Cart/Cart';
import Filter from '../../components/Filter/Filter';
import './Home.css';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../utils/api';

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state?.products?.products);

  useEffect(() => {
      dispatch(fetchProducts());
  }, [dispatch]);

    return (
      <div className="home-container">
          <div className="filter-product-container">
              <div className="filter-section">
                  <Filter products={products} />
              </div>
              <div className="product-section">
                  <ProductList />
              </div>
          </div>
          <div className="cart-section">
              <Cart />
          </div>
      </div>
  );
};

export default Home;