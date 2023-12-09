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
          </TableRow>
        </TableHead>
        <TableBody>
        {properties.map((property, index) => (
            <React.Fragment key={index}>
              <TableRow>
                <TableCell component="th" scope="row">
                  {property.name}
                </TableCell>
                <TableCell className="colorPickerContainer" colSpan={2}>
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

export default LineTable;
