import React from 'react';

// ===== COMPONENTS =====
import Toolbar from './components/toolbar/Toolbar.tsx';
import ElementsPanel from './components/elements/ElementsPanel.tsx';
import PropertiesPanel from './components/properties/PropertiesPanel.tsx';
import Canvas from './components/canvas/Canvas.jsx'

import './app.css';

function App() {
    return (
        <div>
            {/* <Toolbar /> */}
            <div className='editor'>
                <Canvas />
                {/* <PropertiesPanel /> */}
                {/* <ElementsPanel /> */}
            </div>
        </div>
    );
}

export default App;