import "./propertiesPanel.css";
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Slider, Paper, Input } from '@mui/material';

function PropertiesPanel() {
	const [properties, setProperties] = useState([
		{ name: 'Property 1', value: 50 },
		{ name: 'Property 2', value: 30 },
		{ name: 'Property 3', value: 70 },
	  ]);
	
	  const handleSliderChange = (index) => (event, newValue) => {
		const updatedProperties = [...properties];
		updatedProperties[index].value = newValue;
		setProperties(updatedProperties);
	  };
	
	  const handleInputChange = (index) => (event) => {
		const inputValue = event.target.value === '' ? null : parseInt(event.target.value, 10);
	
		if (inputValue === null || (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 100)) {
		  const updatedProperties = [...properties];
		  updatedProperties[index].value = inputValue;
		  setProperties(updatedProperties);
		}
	  };
	


	return (
		<>
			<div className="panel-properties restrict-height absolute flex flex-col cursor-default top-[48px] overflow-hidden right-0 h-full w-[240px] bg-core-grey select-none">
            <div className="flex justify-center items-center text-2xl">Properties</div>
			<TableContainer component={Paper}>
				<Table aria-label="properties table">
					<TableHead>
					<TableRow>
						<TableCell>Property Name</TableCell>
						<TableCell align="right">Value</TableCell>
						<TableCell align="right">Input</TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{properties.map((property, index) => (
						<TableRow key={index}>
						<TableCell component="th" scope="row">
							{property.name}
						</TableCell>
						<TableCell align="right">
							<Slider
								value={property.value || 0}
								onChange={handleSliderChange(index)}
								aria-labelledby="discrete-slider"
								valueLabelDisplay="auto"
								step={10}
								min={0}
								max={100}
							/>
						  </TableCell>
						  <TableCell align="right">
						  	<Input
								type="text"
								value={property.value === null ? '' : property.value}
								onChange={handleInputChange(index)}
								onBlur={handleInputChange(index)}
								inputProps={{
									min: 0,
									max: 100,
									style: { textAlign: 'right' }, // Align text to the right for better visual
								}}
							/>
						  </TableCell>
						</TableRow>
					  ))}
					</TableBody>
				  </Table>
				</TableContainer>
			</div>
		</>
		
	);
}
export default PropertiesPanel;