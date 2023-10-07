import React from 'react'
import { MuiColorInput } from 'mui-color-input'

const ColorPicker = () => {
  const [color, setColor] = React.useState('#ffffff')

  const handleChange = (color) => {
    setColor(color)
  }

  return (
    <MuiColorInput format="hex8" value={color} onChange={handleChange} />
  )
}

export default ColorPicker;