import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import ProductCard from './ProductCard';
import { Product } from '../../Type/type';
import { addToCart } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';

const mockStore = configureStore<RootState>([]);

describe('ProductCard', () => {
    let store: MockStoreEnhanced<RootState>;
    let product: Product;

    beforeEach(() => {
        store = mockStore({
            cart: {
                items: [],
            },
            products: {
                products: [],
                loading: false,
                error: null,
                selectedBrands: [],
                selectedModels: [],
                searchQuery: "",
                selectedSort: "",
            },
        });

        product = {
            id: '1',
            name: 'Product A',
            price: '100',
            image: '',
            description: '',
            model: '',
            brand: '',
            createdAt: '',
        };
    });

    it('should render product details correctly', () => {
        render(
            <Provider store={store}>
                <ProductCard product={product} />
            </Provider>
        );

        expect(screen.getByText('Product A')).toBeInTheDocument();
        expect(screen.getByText('$100.00')).toBeInTheDocument();
        expect(screen.getByAltText('Product A')).toBeInTheDocument();
    });

    it('should dispatch addToCart action when button is clicked', () => {
        render(
            <Provider store={store}>
                <ProductCard product={product} />
            </Provider>
        );

        fireEvent.click(screen.getByText('Add to Cart'));
        const actions = store.getActions();

        expect(actions).toEqual([{ type: addToCart.type, payload: product }]);
    });
});
