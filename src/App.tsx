import React, { useRef } from 'react';
// ===== COMPONENTS =====
import Toolbar from './components/toolbar/Toolbar.tsx';
import ElementsPanel from './components/elements/ElementsPanel.tsx';
import PropertiesPanel from './components/properties/PropertiesPanel.tsx';
import Canvas from './components/canvas/Canvas.tsx'

import './app.css';

function App() {

    const layerRef = useRef(null);

    return (
        <div>
            <Toolbar layerRef={layerRef} />
            <div className='editor'>
                <div className='canvas'>
                    <Canvas layerRef={layerRef} />
                </div>
                {/* <ElementsPanel /> */}
                {/* <PropertiesPanel /> */}
            </div>
        </div>
    );
}

export default App;