import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";
import { CartItem } from "../../Type/type";
import { formatCurrency } from "../../utils/helpers";
import "./Cart.css";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state?.cart?.items);
  const totalPrice = cartItems
  ?.reduce(
      (total, item) => total + parseFloat(item?.product?.price) * item?.quantity,
      0
    )
    ?.toFixed(2);

  const handleIncreaseQuantity = (item: CartItem) => {
    dispatch(incrementQuantity(item?.product?.id));
  };

  const handleDecreaseQuantity = (item: CartItem) => {
    if (item?.quantity <= 1) {
      dispatch(removeFromCart(item?.product?.id));
    } else {
      dispatch(decrementQuantity(item?.product?.id));
    }
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout!");
  };

  return (
    <div className="cart">
      <div className="cart-title">Cart</div>
      <div className="cart-items-section">
        {cartItems.length === 0 ? (
          <p>Hemen alışverişe başlayın</p>
        ) : (
          cartItems?.map((item) => (
            <div key={item?.product?.id} className="cart-item">
              <div className="cart-product-info">
                <span className="cart-product-name">{item?.product?.name}</span>
                <span className="cart-product-price">
                  {formatCurrency(Number(item?.product?.price))}
                </span>
              </div>
              <div className="quantity-controls">
                <button
                  onClick={() => handleDecreaseQuantity(item)}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleIncreaseQuantity(item)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <>
          <div className="cart-title">Checkout</div>
          <div className="cart-summary-section">
            <div className="total-info">
              <div className="total-label">Total Price:</div>
              <div className="total-price">
                {formatCurrency(Number(totalPrice))}
              </div>
            </div>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
