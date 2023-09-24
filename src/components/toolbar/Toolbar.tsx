import React from 'react';
import './toolbar.css';

import {CodeBlock, TextT, ArrowUpRight, Images } from "@phosphor-icons/react"

function Toolbar() {
  return (
    <>
      <div className="toolbar">
        <div className="toolbar-group toolbar-left">
          <div className="toolbar-menu-btn toolbar-menu-">
            <CodeBlock width={32} height={32} color="#fff"/>
          </div>
          <div className="toolbar-menu-btn">
            <TextT width={32} height={32} color="#fff"/>
          </div>
          <div className="toolbar-menu-btn">
            <ArrowUpRight width={32} height={32} color="#fff"/>
          </div>
          <div className="toolbar-menu-btn">
            <Images width={32} height={32} color="#fff"/>
          </div>
        </div>
        <div className="toolbar-group toolbar-center">Untitled Document</div>
        <div className="toolbar-group toolbar-right">
          <button className="toolbar-control-menu btn btn-export"> Export </button>
          <button className="toolbar-control-menu btn btn-share"> Share </button>
          <div className="toolbar-control-menu zoom">
            <div>100%</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Toolbar;
