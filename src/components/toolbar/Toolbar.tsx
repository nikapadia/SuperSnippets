import React, { useState, useEffect } from 'react';
import './toolbar.css';
import DropdownMenu from './Hooks';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ExportModal from '../exportmodal/ExportModal';
import { Select } from '@mui/material';

interface ToolbarProps {
  layerRef: React.MutableRefObject<any>;
}


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




function Toolbar({ layerRef }: ToolbarProps) {

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

  //Export Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="toolbar flex justify-between flex-row absolute box-border bg-core-grey z-10 inset-0 h-12 w-full">
        <div className="flex justify-start items-center relative h-full basis-1/3">


          <ThemeProvider theme={theme}>

            <DropdownMenu buttonType="CodeBlock" openButton={openButton} setOpenButton={setOpenButton} />
            <DropdownMenu buttonType="TextT" openButton={openButton} setOpenButton={setOpenButton} />
            <DropdownMenu buttonType="square" openButton={openButton} setOpenButton={setOpenButton} />
            <DropdownMenu buttonType="Cursor" openButton={openButton} setOpenButton={setOpenButton} />
            <DropdownMenu buttonType="Pen" openButton={openButton} setOpenButton={setOpenButton} />

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
          <button className="flex justify-center border-0 p-2 rounded bg-blue-500 hover:rounded-lg" onClick={handleOpenModal}> Export </button>
          <button className="flex justify-center border-0 p-2 rounded bg-green-400 hover:rounded-lg"> Share </button>
          <div className="flex items-center h-8 p-2 border-o text-center hover:bg-black box-content">
            <div>100%</div>
          </div>
        </div>
        <ExportModal isOpen={isModalOpen} onClose={handleCloseModal} layerRef={layerRef}/>
      </div>
      
    </>
  );
}

export default Toolbar;