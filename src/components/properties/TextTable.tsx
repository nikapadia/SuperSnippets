import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input, Select, MenuItem, Box, InputLabel } from '@mui/material';
import ColorPicker from "./ColorPicker";

const TextTable = ({ properties, handleInputChange }) => {
  // State to manage the selected font
  const [selectedFont, setSelectedFont] = useState('');

  // Handler for font change
  const handleFontChange = (index, value) => (event) => {
    // Update the selected font state and invoke the parent handler
    setSelectedFont(event.target.value);
    handleInputChange(index, value)(event);
  };

  return (
    <TableContainer component={Paper} className="TableContainer dark-mode">
      <Table aria-label="text properties table">
        <TableHead>
          {/* Table header row */}
          <TableRow>
            <TableCell align='left' style={{ fontSize: '20px' }}>Text</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Map through properties to render rows */}
          {properties.map((property, index) => (
            <React.Fragment key={index}>
              {/* Row for text size */}
              <TableRow>
                <TableCell component="th" scope="row">
                  {property.name} Size
                </TableCell>
                <TableCell align="right">
                  {/* Input field for text size */}
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
              {/* Row for text weight */}
              <TableRow>
                <TableCell component="th" scope="row">
                  {property.name} TextWeight
                </TableCell>
                <TableCell align="right">
                  {/* Input field for text weight */}
                  <Input
                    type="text"
                    className="input-fields"
                    value={property.value2 === null ? '' : property.value2}
                    onChange={handleInputChange(index, 'value2')}
                    onBlur={handleInputChange(index, 'value2')}
                    inputProps={{
                      min: 0,
                      max: 100,
                    }}
                  />
                </TableCell>
              </TableRow>
              {/* Row for selecting text font */}
              <TableRow>
                <TableCell colSpan={3}>
                  {/* Wrap the Select in a Box to control its width */}
                  <Box width="100%">
                    {/* Display selected font inside the Select with white color */}
                    {/* Select component for font */}
                    <Select
                      value={selectedFont || ''}
                      onChange={handleFontChange(index, 'font')}
                      fullWidth
                      style={{ color: 'white' }}
                    >
                      <MenuItem value="Arial">Arial</MenuItem>
                      <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                      {/* Add more font options as needed */}
                    </Select>
                  </Box>
                </TableCell>
              </TableRow>
              {/* Row for color picker */}
              <TableRow>
                <TableCell className="colorPickerContainer" colSpan={3}>
                  {/* Color picker component */}
                  <ColorPicker />
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TextTable;
