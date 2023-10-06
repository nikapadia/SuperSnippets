import React, { useState } from 'react';
import { CodeBlock, TextT, Images, Pen, Square } from "@phosphor-icons/react";




interface HoverDropdownProps {
    buttonType: string;
}

function HoverDropdown({ buttonType }: HoverDropdownProps) {
    const [isHovered, setIsHovered] = useState(false);
    if (buttonType == "codeblock") {
        return (
            <div
                className="dropdown-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="box-content h-8 w-8 p-2 hover:bg-black">
                    <CodeBlock width={32} height={32} color="#fff" />
                </div>
                {isHovered && (
                    <div className="dropdown">
                        <button className="dropdown-item">Arrow One</button>
                        <button className="dropdown-item">Arrow Two</button>
                        <button className="dropdown-item">Arrow Three</button>
                    </div>
                )}
            </div>
        );
    }
    if (buttonType == "textt") {
        return (
            <div
                className="dropdown-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="box-content h-8 w-8 p-2 hover:bg-black">
                    <TextT width={32} height={32} color="#fff" />
                </div>
                {isHovered && (
                    <div className="dropdown">
                        <button className="dropdown-item">Arrow One</button>
                        <button className="dropdown-item">Arrow Two</button>
                        <button className="dropdown-item">Arrow Three</button>
                    </div>
                )}
            </div>
        );

    }
    if (buttonType == "images") {
        return (
            <div
                className="dropdown-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="box-content h-8 w-8 p-2 hover:bg-black">
                    <Images width={32} height={32} color="#fff" />
                </div>
                {isHovered && (
                    <div className="dropdown">
                        <button className="dropdown-item">Arrow One</button>
                        <button className="dropdown-item">Arrow Two</button>
                        <button className="dropdown-item">Arrow Three</button>
                    </div>
                )}
            </div>
        );

    }
    if (buttonType == "pen") {
        return (
            <div
                className="dropdown-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="box-content h-8 w-8 p-2 hover:bg-black">
                    <Pen width={32} height={32} color="#fff" />
                </div>
                {isHovered && (
                    <div className="dropdown">
                        <button className="dropdown-item">Arrow One</button>
                        <button className="dropdown-item">Arrow Two</button>
                        <button className="dropdown-item">Arrow Three</button>
                    </div>
                )}
            </div>
        );

    }
    if (buttonType == "square") {
        return (
            <div
                className="dropdown-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="box-content h-8 w-8 p-2 hover:bg-black">
                    <Square width={32} height={32} color="#fff" />
                </div>
                {isHovered && (
                    <div className="dropdown">
                        <button className="dropdown-item">Arrow One</button>
                        <button className="dropdown-item">Arrow Two</button>
                        <button className="dropdown-item">Arrow Three</button>
                    </div>
                )}
            </div>
        );

    }
}

export default HoverDropdown;