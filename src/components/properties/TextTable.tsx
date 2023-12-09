import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input, Select, MenuItem, Box, InputLabel } from '@mui/material';
import ColorPicker from "./ColorPicker";

const TextTable = ({ properties, handleInputChange }) => {
  const [selectedFont, setSelectedFont] = useState('');

  const handleFontChange = (index, value) => (event) => {
    setSelectedFont(event.target.value);
    handleInputChange(index, value)(event);
  };

  return (
    <TableContainer component={Paper} className="TableContainer dark-mode">
      <Table aria-label="text properties table">
        <TableHead>
          <TableRow>
            <TableCell align='left'>Text</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {properties.map((property, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell component="th" scope="row">
                  {property.name} Size
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
              <TableRow>
                <TableCell component="th" scope="row">
                  {property.name} TextWeight
                </TableCell>
                <TableCell align="right">
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
              <TableRow>
                <TableCell colSpan={3}>
                  {/* Wrap the Select in a Box to control its width */}
                  <Box width="100%">
                    {/* Display selected font inside the Select with white color */}
                    <Select
                      value={selectedFont || ''}
                      onChange={handleFontChange(index, 'font')}
                      fullWidth
                      style = {{ color: 'white'}}
                    >
                      <MenuItem value="Arial">Arial</MenuItem>
                      <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                      {/* Add more font options as needed */}
                    </Select>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="colorPickerContainer" colSpan={3}>
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
