import "./propertiesPanel.css";
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Input } from '@mui/material';
import ColorPicker from "./ColorPicker";

interface BackgroundPanel {
	name: string;
	value1: number;
	value2: number;
	[key: string]: string | number;
}

function PropertiesPanel() {


	const [properties, setProperties] = useState([
		({ name: 'BG', value1: 50, value2: 50 }) as BackgroundPanel,
	  ]);
	
	  const handleInputChange = (index: number, value: string) => (event: { target: { value: string; }; }) => {
		const inputValue = event.target.value === '' ? null : parseInt(event.target.value, 10);
	
		if (inputValue === null || (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 100)) {
		  const updatedProperties = [...properties];
		  (updatedProperties[index] as BackgroundPanel)[value] = inputValue === null ? 0 : inputValue;
		  setProperties(updatedProperties);
		}
	  };
	

	return (
		<>
			<div className="panel-properties restrict-height absolute flex flex-col cursor-default top-[48px] overflow-hidden right-0 h-full w-[240px] bg-core-grey select-none">
            <div className="flex justify-center items-center text-2xl">Properties</div>
			<TableContainer component={Paper} className="TableContainer">
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
							<TableCell colSpan={2}>
								<ColorPicker />
							</TableCell>
						</TableRow>
						<TableRow>
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
						</TableRow>
						</React.Fragment>
					  ))}
					</TableBody>
				  </Table>
				</TableContainer>
			</div>
		</>
		
	);
}
export default PropertiesPanel;