import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart, FaUserCircle, FaFilter } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/slices/productSlice";
import { selectCartTotal } from "../../redux/slices/cartSlice";
import { Link, useLocation } from "react-router-dom";
import CustomModal from "../../components/Modal/CustomModal";
import Filter from "../../components/Filter/Filter";
import Cart from "../../components/Cart/Cart";
import { RootState } from "../../redux/store";
import { formatCurrency } from "../../utils/helpers";
import "./Header.css";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const searchRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const totalAmount = useSelector(selectCartTotal);
  const cartItems = useSelector((state: RootState) => state?.cart?.items);
  const products = useSelector((state: RootState) => state?.products?.products);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const location = useLocation();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const toggleSearch = () => {
    setIsSearchVisible((prevIsSearchVisible) => !prevIsSearchVisible);
  };

  const openFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  const closeSearch = () => {
    setIsSearchVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef?.current &&
        !searchRef?.current?.contains(event.target as Node) &&
        iconRef?.current &&
        !iconRef?.current.contains(event.target as Node)
      ) {
        closeSearch();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="left-header-container">
        <Link className="product-link" to={`/`}>
          <h1 className="title">Eteration</h1>
        </Link>
        <div className="search-header-container">
          {isSearchVisible && (
            <div ref={searchRef} className="search-input-header-container">
              <AiOutlineSearch className="search-header-icons" />
              <input
                type="text"
                placeholder="Search"
                className="search-input-header"
                onChange={handleSearchChange}
              />
            </div>
          )}
        </div>

        <div className="search-container-hidden">
          <div className="search-input-container-hidden">
            <AiOutlineSearch className="search-icon-hidden" />
            <input
              type="text"
              placeholder="Search"
              className="search-input-hidden"
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      <div className="mobile-icons">
        {location?.pathname === "/" && (
          <>
            <div ref={iconRef}>
              <AiOutlineSearch className="search-header-icon" onClick={toggleSearch} />
            </div>
            <FaFilter className="filter-icon" onClick={openFilterModal} />
          </>
        )}
        <div className="cart-icon-container" onClick={openCartModal}>
          <FaShoppingCart className="icon" />
          {cartItems?.length > 0 && ( 
            <span className="cart-badge">{cartItems?.length}</span>
          )}
        </div>
      </div>

      <div className="cart-container">
        <div className="icon-container">
          <FaShoppingCart className="icon" />
          <span className="cart-amount">{formatCurrency(totalAmount)}</span>
        </div>
        <div className="icon-container">
          <FaUserCircle className="icon" />
          <span className="user-name">Rıdvan Üçdağ</span>
        </div>
      </div>

      <CustomModal isOpen={isFilterModalOpen} onClose={closeFilterModal}>
        <Filter products={products} />
      </CustomModal>

      <CustomModal isOpen={isCartModalOpen} onClose={closeCartModal}>
        <Cart />
      </CustomModal>
    </header>
  );
};

export default Header;
