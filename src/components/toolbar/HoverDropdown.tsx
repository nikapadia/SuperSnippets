import React, { useState } from 'react';
import {ArrowUpRight} from "@phosphor-icons/react"


function HoverDropdown() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="dropdown-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="box-content h-8 w-8 p-2 hover:bg-black">
                <ArrowUpRight width={32} height={32} color="#fff" />
            </div>
            {isHovered && (
                <div className="dropdown">
                    <button className ="dropdown-item">Arrow One</button>
                    <button className = "dropdown-item">Arrow Two</button>
                    <button className = "dropdown-item">Arrow Three</button>
                </div>
            )}
        </div>
    );
}

export default HoverDropdown;