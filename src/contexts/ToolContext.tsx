import React from 'react';

const ToolContext = React.createContext({
    tool: 'selection',
    setTool: (tool: string) => { },
});

export default ToolContext;