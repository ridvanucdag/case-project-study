import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home';
import store from '../../redux/store';

describe('Home Component', () => {

  it('renders the Home component correctly', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText('ProductList Component')).toBeInTheDocument();
    expect(screen.getByText('Cart Component')).toBeInTheDocument();
    expect(screen.getByText('Filter Component')).toBeInTheDocument();
  });
});
