import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';
import '@testing-library/jest-dom/extend-expect';

describe('NotFoundPage Component', () => {
  it('renders correctly', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();

    expect(screen.getByText('Aradığınız sayfa bulunamadı.')).toBeInTheDocument();
  });
});
