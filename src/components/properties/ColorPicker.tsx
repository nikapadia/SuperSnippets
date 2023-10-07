import React from 'react'
import { MuiColorInput } from 'mui-color-input'

const ColorPicker = () => {
  const [color, setColor] = React.useState('#ffffff')

  const handleChange = (newColor: React.SetStateAction<string> | null) => {
    document.documentElement.style.setProperty('--color-picker-bg', newColor as string);
    setColor(newColor as string);
  }

  return (
    <MuiColorInput format="hex8" value={color} onChange={handleChange} />
  )
}

export default ColorPicker;