// LineTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input } from '@mui/material';
import ColorPicker from "./ColorPicker";
// import './lineTable.css'; // Import your CSS file for LineTable

const LineTable = ({ properties, handleInputChange }) => {
  return (
    <TableContainer component={Paper} className="TableContainer dark-mode">
      <Table aria-label="line properties table">
      <TableHead>
          <TableRow>
          <TableCell align='left' style={{ fontSize: '20px' }}>Line</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {properties.map((property, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell className="colorPickerContainer" colSpan={3}>
                  <ColorPicker />
                </TableCell>
              </TableRow>
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
                  {property.name} LineWeight
                </TableCell>
                <TableCell align="right">
                  <Input
                    type="text"
                    className="input-fields"
                    value={property.value1 === null ? '' : property.value2}
                    onChange={handleInputChange(index, 'value2')}
                    onBlur={handleInputChange(index, 'value2')}
                    inputProps={{
                      min: 0,
                      max: 100,
                    }}
                  />
                </TableCell>
              </TableRow> 
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LineTable;
