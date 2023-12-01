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
            <TableCell>Property Name</TableCell>
            <TableCell align="right" colSpan={2}>Input</TableCell>
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
              {/* <TableRow>
                <TableCell component="th" scope="row">
                  {property.name} (Input)
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
              </TableRow> */}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BackgroundTable;
