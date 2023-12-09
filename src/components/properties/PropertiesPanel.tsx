import React, { useState, useEffect } from 'react';
import BackgroundTable from './BackgroundTable';
import LineTable from './LineTable';
import TextTable from './TextTable';
import "./propertiesPanel.css";

function PropertiesPanel() {
  const [properties, setProperties] = useState([
    { name: '', value1: 0, value2: 0 },
  ]);

  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [activeTable, setActiveTable] = useState(0);

  const handleInputChange = (index, value) => (event) => {
    const inputValue = event.target.value === '' ? null : parseInt(event.target.value, 10);

    if (inputValue === null || (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 100)) {
      const updatedProperties = [...properties];
      updatedProperties[index][value] = inputValue === null ? 0 : inputValue;
      setProperties(updatedProperties);
    }
  };

  const tables = [
    <BackgroundTable properties={properties} handleInputChange={handleInputChange} />,
    <LineTable properties={properties} handleInputChange={handleInputChange} />,
    <TextTable properties={properties} handleInputChange={handleInputChange} />
  ];

  const handleKeyPress = (event) => {
    if (event.key.toLowerCase() === 'p') {
      setIsPanelVisible(!isPanelVisible);
    } else if (event.key.toLowerCase() === 'q') {
      setActiveTable((activeTable + 1) % tables.length);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPanelVisible, activeTable]);

  return (
    <div className={`panel-properties restrict-height absolute flex flex-col cursor-default top-[48px] overflow-hidden right-0 h-full w-[240px] bg-core-grey select-none ${isPanelVisible ? '' : 'hidden'} ${isPanelVisible ? 'fade-in' : 'fade-out'}`}>
      <div className="flex justify-center items-center text-2xl">Properties</div>
      {tables[activeTable]}
    </div>
  );
}

export default PropertiesPanel;
