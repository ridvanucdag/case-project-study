import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomModal from "./CustomModal";
import "@testing-library/jest-dom/extend-expect";

describe("CustomModal Component", () => {
  const mockOnClose = jest.fn();

  it("does not render when isOpen is false", () => {
    render(<CustomModal isOpen={false} onClose={mockOnClose}>Test Content</CustomModal>);
    
    expect(screen.queryByText("Test Content")).toBeNull();
  });

  it("renders correctly when isOpen is true", () => {
    render(<CustomModal isOpen={true} onClose={mockOnClose}>Test Content</CustomModal>);

    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /x/i })).toBeInTheDocument();
  });

  it("calls onClose when the close button is clicked", () => {
    render(<CustomModal isOpen={true} onClose={mockOnClose}>Test Content</CustomModal>);

    const closeButton = screen.getByRole("button", { name: /x/i });
    
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
