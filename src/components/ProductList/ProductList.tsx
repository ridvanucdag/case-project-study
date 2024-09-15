import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredAndSortedProducts } from '../../redux/slices/productSlice';
import { AppDispatch } from '../../redux/store';
import { Product } from '../../Type/type';
import { fetchProducts } from '../../utils/api';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector(selectFilteredAndSortedProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
      dispatch(fetchProducts());
  }, [dispatch]);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(products?.length / itemsPerPage);

  const renderPagination = () => {
      const paginationItems = [];

      if (currentPage > 1) {
          paginationItems?.push(
              <button key="prev" onClick={() => setCurrentPage(currentPage - 1)}>
                  &lt;
              </button>
          );
      }

      const startPage = Math.max(1, currentPage - 1); 
      const endPage = Math.min(totalPages, currentPage + 1);

      if (startPage > 1) {
          paginationItems?.push(
              <span key="1" onClick={() => setCurrentPage(1)}>1</span>
          );
          if (startPage > 2) {
              paginationItems?.push(<span key="dots-left">...</span>);
          }
      }

      for (let i = startPage; i <= endPage; i++) {
          paginationItems?.push(
              <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  disabled={currentPage === i}
              >
                  {i}
              </button>
          );
      }

      if (endPage < totalPages) {
          if (endPage < totalPages - 1) {
              paginationItems?.push(<span key="dots-right">...</span>);
          }
          paginationItems?.push(
              <span key={totalPages} onClick={() => setCurrentPage(totalPages)}>{totalPages}</span>
          );
      }

      if (currentPage < totalPages) {
          paginationItems?.push(
              <button key="next" onClick={() => setCurrentPage(currentPage + 1)}>
                  &gt;
              </button>
          );
      }

      return <div className="pagination">{paginationItems}</div>;
  };

  return (
      <div className="product-list">
          <div className="products-container">
              {currentProducts?.length > 0 ? (
                  currentProducts?.map((product: Product) => (
                      <ProductCard key={product?.id} product={product} />
                  ))
              ) : (
                  <p className="no-products-available">Ürün bulunamadı..</p>
              )}
          </div>
          <div className="pagination-container">
              {renderPagination()}
          </div>
      </div>
  );
};

export default ProductList;
