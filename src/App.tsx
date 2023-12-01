// ===== COMPONENTS =====
import Toolbar from './components/toolbar/Toolbar.tsx';
import ElementsPanel from './components/elements/ElementsPanel.tsx';
import PropertiesPanel from './components/properties/PropertiesPanel.tsx';
import Canvas from './components/canvas/Canvas.tsx'

import './app.css';

function App() {
    return (
        <div>
            <Toolbar />
            <div className='editor'>
                <div className='canvas'>
                    <Canvas />
                </div>
                {/* <ElementsPanel />*/}
                <PropertiesPanel /> 
            </div>
        </div>
    );
}

export default App;