import React, { useState, useEffect } from 'react';
import BackgroundTable from './BackgroundTable';
import Prop1Table from './Prop1Table';
import Prop2Table from './Prop2Table';
import "./propertiesPanel.css";

function PropertiesPanel() {
  const [properties, setProperties] = useState([
    { name: 'BG', value1: 50, value2: 50 }
  ]);

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
    <Prop1Table />,
    <Prop2Table />
  ];
  const [activeTable, setActiveTable] = useState(0);

  const handleKeyPress = (event) => {
    if (event.key === 'q' || event.key === 'Q') {
      setActiveTable((activeTable + 1) % tables.length);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [activeTable]);

  return (
    <div className="panel-properties restrict-height absolute flex flex-col cursor-default top-[48px] overflow-hidden right-0 h-full w-[240px] bg-core-grey select-none">
      <div className="flex justify-center items-center text-2xl">Properties</div>
      {tables[activeTable]}
    </div>
  );
}

export default PropertiesPanel;
