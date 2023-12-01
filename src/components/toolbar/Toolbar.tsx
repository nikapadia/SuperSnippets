import React, { useState, useEffect } from 'react';
import './toolbar.css';
import DropdownMenu from './MenuDropdown';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Select } from '@mui/material';

const theme = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#3a3a3a',
          color: 'white',
          '&:hover': {
            backgroundColor: '#4e4e4e',
            color: 'white',
          },
          '&.Mui-selected': {
            backgroundColor: '#486cf0',
            color: 'white',
          },
          '&.Mui-selected:hover': {
            backgroundColor: '#486cf0',
            color: 'white',
          },
        },
      },
    },
  },
});




function Toolbar() {

  const [openButton, setOpenButton] = React.useState("Cursor");

  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    localStorage.setItem("documentTitle", e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("documentTitle"))
      setValue(localStorage.getItem("documentTitle"));
    else
      setValue("Untitled Document");
  }, []);



  return (
    <>
      <div className="toolbar flex justify-between flex-row absolute box-border bg-core-grey z-10 inset-0 h-12 w-full">
        <div className="flex justify-start items-center relative h-full basis-1/3">


          <ThemeProvider theme={theme}>

            <DropdownMenu buttonType="Cursor" openButton={openButton} setOpenButton={setOpenButton} />
            <DropdownMenu buttonType="square" openButton={openButton} setOpenButton={setOpenButton} />
            <DropdownMenu buttonType="Pen" openButton={openButton} setOpenButton={setOpenButton} />
            <DropdownMenu buttonType="TextT" openButton={openButton} setOpenButton={setOpenButton} />

          </ThemeProvider>




        </div>


        <div className="flex justify-center items-center h-full basis-2/5">
          <input
            value={value}
            onChange={handleChange}
            className="document-title"
          />
        </div>

        <div className="flex justify-end items-center h-full gap-2 pr-2 basis-1/3">
          <button className="modal-button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-2.5 py-1.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"> Export </button>
          <div className="flex items-center h-8 p-2 border-o text-center text-white hover:bg-black box-content">
            <div>100%</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Toolbar;