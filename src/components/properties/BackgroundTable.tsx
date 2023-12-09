import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input } from '@mui/material';
import ColorPicker from "./ColorPicker";
import './backgroundTable.css'; // Import your CSS file

// BackgroundTable component receives properties and handleInputChange as props
const BackgroundTable = ({ properties, handleInputChange }) => {
  // Function to get the dimensions of the webpage
  const getDimensions = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  // Initial dimensions obtained when the component is mounted
  const initialDimensions = getDimensions();

  return (
    <TableContainer component={Paper} className="TableContainer dark-mode">
      {/* Main Table component */}
      <Table aria-label="properties table">
        <TableHead>
          {/* Table header row */}
          <TableRow>
          <TableCell align='left' style={{ fontSize: '20px' }}>Background</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Map through properties to render rows */}
          {properties.map((property, index) => (
            <React.Fragment key={index}>
              {/* Row for ColorPicker component */}
              <TableRow>
                <TableCell className="colorPickerContainer" colSpan={3}>
                  <ColorPicker />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  {property.name} Opacity
                </TableCell>
                <TableCell align="right">
                  <Input
                    type="text"
                    className="input-fields"
                    value={property.value1 === null ? '' : property.value1}
                    onChange={handleInputChange(index, 'value1')}
                    onBlur={handleInputChange(index, 'value1')}
                    inputProps={{
                      min: 0,
                      max: 100,
                    }}
                  />
                </TableCell>
              </TableRow> 
              {/* Add a new row for displaying dimensions */}
              <TableRow>
                <TableCell align="right" colSpan={2}>
                  {/* Display the dimensions here */}
                  {`Dimensions: ${initialDimensions.width}px, ${initialDimensions.height}px`}
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BackgroundTable;
