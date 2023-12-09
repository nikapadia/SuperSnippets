// BackgroundTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input } from '@mui/material';
import ColorPicker from "./ColorPicker";
import './backgroundTable.css'; // Import your CSS file

const BackgroundTable = ({ properties, handleInputChange }) => {
  return (
    <TableContainer component={Paper} className="TableContainer dark-mode">
      <Table aria-label="properties table">
        <TableHead>
          <TableRow>
            <TableCell align='left'>Background</TableCell>
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
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BackgroundTable;
