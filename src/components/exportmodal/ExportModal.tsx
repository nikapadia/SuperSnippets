import React, { useRef, useEffect, MutableRefObject, useState } from 'react';
import { jsPDF } from "jspdf";
import Tiff from 'tiff.js';
import './exportmodal.css';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  layerRef: MutableRefObject<any>;
}


const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, layerRef}) => {
  const [dataUrl, setDataUrl] = React.useState<string | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (layerRef && layerRef.current) {
      setDataUrl(layerRef.current.toDataURL());
    }
  }, [layerRef, isOpen]);

  const handleScaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScale(Number(event.target.value));
  };

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

  const handleExportJPEG = () => {
    const dataUrl = layerRef.current?.toDataURL({ format: 'jpeg', quality: 1 });
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = 'SuperSnippets.jpeg';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleExportWEBP = () => {
    const dataUrl = layerRef.current?.toDataURL({ format: 'webp', quality: 1 });
    if (dataUrl) {
      const link = document.createElement('a');
      link.download = 'SuperSnippets.webp';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const dataUrl = layerRef.current?.toDataURL("image/jpeg", 1);
    if (dataUrl) {
      doc.addImage(dataUrl, "JPEG", 0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());
      doc.save("SuperSnippets.pdf");
    }
  };

  const handleExportTIFF = () => {
    const canvas = layerRef.current;
    if (canvas) {
      const width = canvas.width;
      const height = canvas.height;
      const ctx = canvas.getContext('2d');
      const imageData = ctx?.getImageData(0, 0, width, height);
      if (imageData) {
        const tiff = new Tiff({ width: width, height: height });
        tiff.writeDirectory();
        tiff.writeImage(imageData);
        const tiffData = tiff.end();
        const blob = new Blob([tiffData], { type: 'image/tiff' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'SuperSnippets.tiff';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const handleFixedSizeExport = () => {
    const originalCanvas = layerRef.current;
    const newCanvas = document.createElement('canvas');
    newCanvas.width = 640;
    newCanvas.height = 360;
    const context = newCanvas.getContext('2d');
    if (context) {
      context.drawImage(originalCanvas, 0, 0, 640, 360);
    }
    const dataUrl = newCanvas.toDataURL();
    const link = document.createElement('a');
    link.download = 'export.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className={`export-modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={stopPropagation}>
        <div className="modal-flex-container">
          <div className="canvas-container">
            {dataUrl && <img className="canvas-content" src={dataUrl} alt="Canvas Preview" />}
          </div>
          <button className="close-button" onClick={onClose}>x</button>
          <div className="export-buttons">
          <div className="slider-container">
          <label htmlFor="scale-slider">Scaling</label>
          <input type="range" min="0.1" max="2" step="0.1" value={scale} onChange={handleScaleChange} />
          </div>
            <button className="export-button" onClick={handleExport}>Export to PNG</button>
            <button className="export-button" onClick={handleExportJPEG}>Export to JPEG</button>
            <button className="export-button" onClick={handleExportWEBP}>Export to WEBP</button>
            <button className="export-button" onClick={handleExportPDF}>Export to PDF</button>
            <button className="export-button" onClick={handleExportTIFF}>Export to TIFF</button>
            <button className="export-button" onClick={handleFixedSizeExport}>Export Code Block</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ExportModal;