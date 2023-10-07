import React from 'react';
import './toolbar.css';
import HoverDropdown from './HoverDropdown';
import ToggleDropdown from './ToggleDropdown';


function Toolbar() {
  return (
    <>
      <div className="toolbar flex justify-between flex-row absolute box-border bg-core-grey z-10 inset-0 h-12 w-full">
        <div className="flex justify-start items-center relative h-full basis-1/3">
          <HoverDropdown buttonType={"codeblock"} />
          <HoverDropdown buttonType={"textt"} />
          <HoverDropdown buttonType={"images"} />
          <HoverDropdown buttonType={"pen"} /> 
          <ToggleDropdown />
        </div>
        <div className="flex justify-center items-center h-full basis-2/5">Untitled Document</div>
        <div className="flex justify-end items-center h-full gap-2 pr-2 basis-1/3">
          <button className="flex justify-center border-0 p-2 rounded bg-blue-500 hover:rounded-lg"> Export </button>
          <button className="flex justify-center border-0 p-2 rounded bg-green-400 hover:rounded-lg"> Share </button>
          <div className="flex items-center h-8 p-2 border-o text-center hover:bg-black box-content">
            <div>100%</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Toolbar;