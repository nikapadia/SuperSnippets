// Prop2Table.js
import React from 'react';

const Prop2Table = () => {
  const prop1Data = [
    { name: 'Property A', value: 10 },
    { name: 'Property B', value: 20 },
    { name: 'Property C', value: 30 },
    // Add more properties as needed
  ];

  return (
    <div>
      <h2>Prop2 Table</h2>
      <table>
        <thead>
          <tr>
            <th>Property Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {prop1Data.map((property, index) => (
            <tr key={index}>
              <td>{property.name}</td>
              <td>{property.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Prop2Table;
