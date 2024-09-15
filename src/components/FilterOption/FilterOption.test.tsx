import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterOption from './FilterOption';
import '@testing-library/jest-dom/extend-expect';

describe('FilterOption', () => {
    const mockOnToggleOption = jest.fn();

    const defaultProps = {
        title: 'Test Filter',
        options: ['Option 1', 'Option 2', 'Option 3'],
        type: 'checkbox',
        selectedOptions: [],
        onToggleOption: mockOnToggleOption,
    };

    test('renders the filter title', () => {
        render(<FilterOption {...defaultProps} />);
        expect(screen.getByText('Test Filter')).toBeInTheDocument();
    });

    test('toggles options visibility when the title is clicked', () => {
        render(<FilterOption {...defaultProps} />);

        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('Test Filter'));

        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    test('calls onToggleOption when an option is checked', () => {
        render(<FilterOption {...defaultProps} />);
        
        fireEvent.click(screen.getByText('Test Filter'));

        fireEvent.click(screen.getByLabelText('Option 1'));

        expect(mockOnToggleOption).toHaveBeenCalledWith('Option 1');
    });

    test('filters options based on search input', () => {
        render(<FilterOption {...defaultProps} />);

        fireEvent.click(screen.getByText('Test Filter'));

        const searchInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: '1' } });

        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
        expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
    });

    test('shows no options message when there are no matching options', () => {
        render(<FilterOption {...defaultProps} />);

        fireEvent.click(screen.getByText('Test Filter'));

        const searchInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'Non-matching' } });

        expect(screen.getByText('Seçenek yok')).toBeInTheDocument();
    });
});
