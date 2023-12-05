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

  const handleExport = () => {
    const dataUrl = layerRef.current?.toDataURL();
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = 'SuperSnippets.png'; // This will prompt the user to save the image as 'canvas.png'
      link.href = dataUrl;
      document.body.appendChild(link); // This line is necessary for Firefox
      link.click();
      document.body.removeChild(link); // This line is necessary for Firefox
    }
  };


  return (
    <div className="export-modal" onClick={onClose}>
      <div className="modal-content" onClick={stopPropagation}>
      <div className="modal-flex-container">
        <div className="canvas-container">
        {dataUrl && <img className="canvas-content" src={dataUrl} alt="Canvas Preview" />}
        </div>
          <button className="close-button" onClick={onClose}>X</button>
          <div className="export-buttons">
            <button className="export-button" onClick={handleExport}>Export to PNG</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ExportModal;