import React, { useState }  from 'react';

// ===== COMPONENTS =====
import Toolbar from './components/toolbar/Toolbar.tsx'
import ElementsPanel from './components/elements/ElementsPanel.tsx'
import PropertiesPanel from './components/properties/PropertiesPanel.tsx'
import ExportModal from './components/exportmodal/ExportModal.tsx'
import Canvas from './components/canvas/Canvas.tsx'

import './app.css';

function App() {
    const [isExportOpen, setExportOpen] = useState(false);
    console.log(isExportOpen);
    const openExport = () => {
        console.log('openExport function called');
        setExportOpen(true);
      };

    const closeExport = () => {
        setExportOpen(false);
    };
    return (
        <div>
             <button onClick={openExport}>Open Export</button>
            <ExportModal isOpen={isExportOpen} onClose={closeExport} />
            <Toolbar onExportClick={openExport} />
            <div className='editor'>
                <PropertiesPanel />
                <Canvas />
                <ElementsPanel />
            </div>
        </div>
    );
}

export default App;