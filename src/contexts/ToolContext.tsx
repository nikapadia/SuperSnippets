import React, { useState } from 'react';

export const ToolContext = React.createContext({
    tool: 'selection',
    setTool: (tool: string) => {},
});

export const ToolProvider = ({ children }) => {
    const [tool, setTool] = useState('selection');

    return (
        <ToolContext.Provider value={{ tool, setTool }}>
            {children}
        </ToolContext.Provider>
    );
};