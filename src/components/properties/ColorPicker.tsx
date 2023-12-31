import React from 'react';
import { MuiColorInput } from 'mui-color-input';

const ColorPicker = () => {
  const initialColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-bg-color-dark').trim();

  const [color, setColor] = React.useState(initialColor);

  const handleChange = (newColor) => {
    document.documentElement.style.setProperty('--color-picker-bg', newColor);
    setColor(newColor);
  }

  return (
    <MuiColorInput 
    sx={{
      "& input": {
          color: 'white',
      }
  }}
    format="hex8" value={color} onChange={handleChange} />
  );
}

export default ColorPicker;
