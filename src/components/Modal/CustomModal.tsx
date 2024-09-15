import React from "react";
import "./CustomModal.css";

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close-btn" onClick={onClose}>
          X
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
