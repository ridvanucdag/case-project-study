import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import ProductDetail from './ProductDetail';
import { BrowserRouter as Router } from 'react-router-dom';
import { addToCart } from '../../redux/slices/cartSlice';
import '@testing-library/jest-dom/extend-expect';
import store from '../../redux/store';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '1' }),
}));

jest.mock('../../redux/slices/cartSlice', () => ({
  addToCart: jest.fn(),
}));

jest.mock('../../utils/helpers', () => ({
  formatCurrency: jest.fn((value) => `$${value.toFixed(2)}`),
}));

describe('ProductDetail Component', () => {

  it('renders product details correctly', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductDetail />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'test-image.jpg');
  });

  it('calls addToCart when Add to Cart button is clicked', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductDetail />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText('Add to Cart'));

    expect(addToCart).toHaveBeenCalledWith({
      id: '1',
      name: 'Test Product',
      price: 100,
      image: 'test-image.jpg',
      description: 'Test description',
    });
  });

  it('renders Cart component', () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductDetail />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Cart Component')).toBeInTheDocument();
  });
});
