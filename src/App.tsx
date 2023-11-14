// ===== COMPONENTS =====
import Toolbar from './components/toolbar/Toolbar.tsx';
import ElementsPanel from './components/elements/ElementsPanel.tsx';
import PropertiesPanel from './components/properties/PropertiesPanel.tsx';
import Canvas from './components/canvas/Canvas.tsx'
import { ToolProvider } from './contexts/ToolContext.tsx';
import { useState } from 'react';

import './app.css';

function App() {
    const [tool, setTool] = useState("selection");
    return (
        <ToolProvider>
        <div>
            <Toolbar />
            <div className='editor'>
                <div className='canvas'>
                    <Canvas />
                </div>
                {/* <ElementsPanel /> */}
                {/* <PropertiesPanel /> */}
            </div>
        </div>
        </ToolProvider>
    );
}

export default App;