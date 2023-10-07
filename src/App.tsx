
// ===== COMPONENTS =====
import Toolbar from './components/toolbar/Toolbar.tsx'
import ElementsPanel from './components/elements/ElementsPanel.tsx'
import PropertiesPanel from './components/properties/PropertiesPanel.tsx'

function App() {
    return (
        <div>
            <Toolbar />
            <ElementsPanel />
            <PropertiesPanel />
        </div>
    );
}

export default App;