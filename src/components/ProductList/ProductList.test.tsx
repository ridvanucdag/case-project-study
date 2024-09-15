import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ProductList from './ProductList';
import { fetchProducts } from '../../utils/api';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../utils/api', () => ({
    fetchProducts: jest.fn(),
}));

const mockStore = configureStore([]);

describe('ProductList', () => {
    let store: any;

    beforeEach(() => {
        store = mockStore({
            products: {
                products: [
                    { id: '1', name: 'Product 1', price: '100', createdAt: '2024-01-01', brand: 'Brand A', model: 'Model A' },
                    { id: '2', name: 'Product 2', price: '200', createdAt: '2024-01-02', brand: 'Brand B', model: 'Model B' },
                    { id: '3', name: 'Product 3', price: '150', createdAt: '2024-01-03', brand: 'Brand C', model: 'Model C' },
                ],
                selectedBrands: [],
                selectedModels: [],
                searchQuery: '',
                selectedSort: '',
                loading: false,
                error: null,
            },
        });

        jest.clearAllMocks();
    });

    test('renders products when available', () => {
        render(
            <Provider store={store}>
                <ProductList />
            </Provider>
        );

        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
        expect(screen.getByText('Product 3')).toBeInTheDocument();
    });

    test('renders no products message when no products are available', () => {
        store = mockStore({
            products: {
                products: [],
                selectedBrands: [],
                selectedModels: [],
                searchQuery: '',
                selectedSort: '',
                loading: false,
                error: null,
            },
        });

        render(
            <Provider store={store}>
                <ProductList />
            </Provider>
        );

        expect(screen.getByText('Ürün bulunamadı..')).toBeInTheDocument();
    });

    test('handles pagination correctly', () => {
        render(
            <Provider store={store}>
                <ProductList />
            </Provider>
        );
        fireEvent.click(screen.getByText('>'));
    });

    test('fetches products on mount', () => {
        render(
            <Provider store={store}>
                <ProductList />
            </Provider>
        );
        expect(fetchProducts).toHaveBeenCalled();
    });
});
