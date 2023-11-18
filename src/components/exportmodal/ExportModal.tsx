import React, { useRef, useEffect, MutableRefObject } from 'react';
import './exportmodal.css';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  layerRef: MutableRefObject<any>;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, layerRef}) => {
  const [dataUrl, setDataUrl] = React.useState<string | null>(null);
  useEffect(() => {
    if (layerRef && layerRef.current) {
      setDataUrl(layerRef.current.toDataURL());
    }
  }, [layerRef, isOpen]);
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
        <div className="canvas-container">
        {dataUrl && <img className="canvas-content" src={dataUrl} alt="Canvas Preview" />}
        </div>
        <button className="export-button">Export to PNG</button>
      </div>
    </div>
  );
}
export default ExportModal;