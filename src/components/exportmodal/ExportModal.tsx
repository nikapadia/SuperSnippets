import React from 'react';
import './exportmodal.css';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const stopPropagation = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className="export-modal" onClick={onClose}>
      <div className="modal-content" onClick={stopPropagation}>
      <button className="close-button" onClick={onClose}>X</button>
        <h2>Export Data</h2>
        <button>Export to PNG</button>
      </div>
    </div>
  );
}

export default ExportModal;