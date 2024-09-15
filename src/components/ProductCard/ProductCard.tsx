import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { Product } from '../../Type/type';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { formatCurrency } from '../../utils/helpers';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    return (
        <div className="product-card">
            <Link className="product-link" key={product?.id} to={`/product/${product?.id}`}>
                <img className="product-image" src={product?.image} alt={product?.name} />
                <p className="product-price">{formatCurrency(Number(product?.price))}</p>
                <h3 className="product-name">{product?.name}</h3>
            </Link>
            <button className="add-to-cart-buttons" onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;
