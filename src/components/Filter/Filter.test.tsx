import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Filter from './Filter';
import { Product } from '../../Type/type';

const renderWithRedux = (component: React.ReactElement, { initialState } = { initialState: {} }) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Filter', () => {
  const products: Product[] = [
    {
      id: '1',
      brand: 'Brand A',
      model: 'Model A',
      createdAt: new Date().toISOString(),
      name: 'Product A',
      image: 'image-url-a',
      price: '100',
      description: 'Description of Product A',
    },
    {
      id: '2',
      brand: 'Brand B',
      model: 'Model B',
      createdAt: new Date().toISOString(),
      name: 'Product B',
      image: 'image-url-b',
      price: '200',
      description: 'Description of Product B',
    },
    {
      id: '3',
      brand: 'Brand A',
      model: 'Model C',
      createdAt: new Date().toISOString(),
      name: 'Product C',
      image: 'image-url-c',
      price: '150',
      description: 'Description of Product C',
    },
  ];

  const setup = () => {
    renderWithRedux(<Filter products={products} />);
  };

  test('renders the Brands filter option', () => {
    setup();
    expect(screen.getByText('Brands')).toBeInTheDocument();
  });

  test('renders the Model filter option', () => {
    setup();
    expect(screen.getByText('Model')).toBeInTheDocument();
  });

  test('renders the Sort By filter option', () => {
    setup();
    expect(screen.getByText('Sort By')).toBeInTheDocument();
  });

  test('displays unique brands', () => {
    setup();
    expect(screen.getByLabelText('Brand A')).toBeInTheDocument();
    expect(screen.getByLabelText('Brand B')).toBeInTheDocument();
  });

  test('displays unique models', () => {
    setup();
    expect(screen.getByLabelText('Model A')).toBeInTheDocument();
    expect(screen.getByLabelText('Model B')).toBeInTheDocument();
    expect(screen.getByLabelText('Model C')).toBeInTheDocument();
  });
});
