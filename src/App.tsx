import React from 'react';

// ===== COMPONENTS =====
import Toolbar from './components/toolbar/Toolbar.tsx'
import ElementsPanel from './components/elements/ElementsPanel.tsx'
import PropertiesPanel from './components/properties/PropertiesPanel.tsx'
import Canvas from './components/canvas/Canvas.jsx'

import './App.css';

function App() {
    return (
        <div>
            <Toolbar />
            <div className="editor">
                <ElementsPanel />
                <Canvas
                    width={700}
                    height={500} 
                />
                <PropertiesPanel />
            </div>
        </div>
    );
}

export default App;