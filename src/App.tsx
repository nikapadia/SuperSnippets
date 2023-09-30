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
            <Canvas />
        </div>
    );
}

export default App;