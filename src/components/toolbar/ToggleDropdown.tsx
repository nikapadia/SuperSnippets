import React, { useState } from 'react';

const ToggleDropdownMenu = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div className="dropdown">
            <button className="toggle-button" onClick={toggleMenu}>
                Toggle Dropdown
            </button>
            {isMenuOpen && (
                <ul className="menu-items">
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            )}
        </div>
    );
};

export default ToggleDropdownMenu;
