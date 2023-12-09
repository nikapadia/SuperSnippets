import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input, Select, MenuItem } from '@mui/material';
import ColorPicker from "./ColorPicker";

const TextTable = ({ properties, handleInputChange }) => {
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
                <TableCell component="th" scope="row">
                  {property.name} Font
                </TableCell>
                <TableCell  colSpan={3}>
                  <Select
                    value={property.font || ''}
                    onChange={handleInputChange(index, 'font')}
                  >
                    <MenuItem value="Arial">Arial</MenuItem>
                    <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                    {/* Add more font options as needed */}
                  </Select>
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
