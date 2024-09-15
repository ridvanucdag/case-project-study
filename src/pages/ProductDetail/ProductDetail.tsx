import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { Product } from '../../Type/type';
import { addToCart } from '../../redux/slices/cartSlice';
import './ProductDetail.css';
import Cart from '../../components/Cart/Cart';
import { formatCurrency } from '../../utils/helpers';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const products = useSelector((state: RootState) => state?.products);
    const dispatch = useDispatch();
    const product = products?.products?.find((p: Product) => p?.id === id);

    if (!product) {
        return <p>Loading product details...</p>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
<div className="product-detail-container">
    <div className="product-detail">
        <img className="product-detail-image" src={product?.image} alt={product.name} />
        <div className="product-info">
            <h1 className="product-name">{product?.name}</h1>
            <p className="product-price">{formatCurrency(Number(product?.price))}</p>
            <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
            <p className="product-description">{product?.description}</p>
        </div>
    </div>

    <div className="cart-detail-section">
        <Cart />
    </div>
</div>

    );
};

export default ProductDetail;
