import React, { useRef, useEffect } from 'react';
import './exportmodal.css';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, canvasRef}) => {
  const [dataUrl, setDataUrl] = React.useState<string | null>(null);
  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      setDataUrl(canvasRef.current.toDataURL());
    }
  }, [canvasRef, isOpen]);
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
        {dataUrl && <img src={dataUrl} alt="Canvas Preview" />}
        <button className="export-button">Export to PNG</button>
      </div>
    </div>
  );
}

export default ExportModal;