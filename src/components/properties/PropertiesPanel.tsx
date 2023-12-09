import React, { useState, useEffect } from 'react';
import BackgroundTable from './BackgroundTable';
import LineTable from './LineTable';
import TextTable from './TextTable';
import "./propertiesPanel.css";

function PropertiesPanel() {
  // State to manage properties data
  const [properties, setProperties] = useState([
    { name: '', value1: 0, value2: 0 },
  ]);

  // State to manage panel visibility
  const [isPanelVisible, setIsPanelVisible] = useState(true);

  // State to manage the active table
  const [activeTable, setActiveTable] = useState(0);

  // Input change handler for updating property values
  const handleInputChange = (index, value) => (event) => {
    const inputValue = event.target.value === '' ? null : parseInt(event.target.value, 10);

    // Validate input value
    if (inputValue === null || (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 100)) {
      const updatedProperties = [...properties];
      updatedProperties[index][value] = inputValue === null ? 0 : inputValue;
      setProperties(updatedProperties);
    }
  };

  // Array of table components
  const tables = [
    <BackgroundTable properties={properties} handleInputChange={handleInputChange} />,
    <LineTable properties={properties} handleInputChange={handleInputChange} />,
    <TextTable properties={properties} handleInputChange={handleInputChange} />
  ];

  // Key press handler for toggling panel visibility and changing active table
  const handleKeyPress = (event) => {
    if (event.key.toLowerCase() === 'p') {
      // Toggle panel visibility when 'p' key is pressed
      setIsPanelVisible(!isPanelVisible);
    } else if (event.key.toLowerCase() === 'q') {
      // Change active table when 'q' key is pressed
      setActiveTable((activeTable + 1) % tables.length);
    }
  };

  // Add keydown event listener and cleanup on component mount/unmount
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isPanelVisible, activeTable]);

  // Render the properties panel
  return (
    <div className={`panel-properties restrict-height absolute flex flex-col cursor-default top-[48px] overflow-hidden right-0 h-full w-[240px] bg-core-grey select-none ${isPanelVisible ? '' : 'hidden'} ${isPanelVisible ? 'fade-in' : 'fade-out'}`}>
      {/* Panel header */}
      <div className="flex justify-center items-center text-2xl">Properties</div>
      {/* Render the active table */}
      {tables[activeTable]}
    </div>
  );
}

export default PropertiesPanel;
