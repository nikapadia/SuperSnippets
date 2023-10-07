import React, { useState } from 'react';
import { CodeBlock, TextT, Images, Pen, Square, LineSegment } from "@phosphor-icons/react";




interface HoverDropdownProps {
    buttonType: string;
}

function HoverDropdown({ buttonType }: HoverDropdownProps) {
    const [isToggled, setToggle] = useState(false);
    if (buttonType == "codeblock") {
        return (
            <div
                className="dropdown-container"
                onClick={() => setToggle(!isToggled)}
            >
                <div className="box-content h-8 w-8 p-2 hover:bg-black">
                    <CodeBlock width={32} height={32} color="#fff" />
                </div>
                {isToggled && (
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
                onClick={() => setToggle(!isToggled)}
            >
                <div className="box-content h-8 w-8 p-2 hover:bg-black">
                    <TextT width={32} height={32} color="#fff" />
                </div>
                {isToggled && (
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
                onClick={() => setToggle(!isToggled)}
            >
                <div className="box-content h-8 w-8 p-2 hover:bg-black">
                    <Images width={32} height={32} color="#fff" />
                </div>
                {isToggled && (
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
                onClick={() => setToggle(!isToggled)}
            >
                <div className="box-content h-8 w-8 p-2 hover:bg-black">
                    <Pen width={32} height={32} color="#fff" />
                </div>
                {isToggled && (
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
                onClick={() => setToggle(!isToggled)}
            >
                <div className="box-content h-8 w-8 p-2 hover:bg-black">
                    <Square width={32} height={32} color="#fff" />
                </div>
                {isToggled && (
                    <div className="dropdown">
                        <button className="dropdown-item-square">

                            <div className="button-content">
                                <Square width={16} height={16} color="#fff" />
                                Rectangle
                            </div>

                        </button>
                        <button className="dropdown-item-square">Line </button>
                        <button className="dropdown-item-square">Arrow</button>
                        <button className="dropdown-item-square">Ellipse</button>
                        <button className="dropdown-item-square">Polygon</button>
                        <button className="dropdown-item-square">Star</button>
                        <button className="dropdown-item-square">Custom</button>
                    </div>
                )}
            </div>
        );

    }
}

export default HoverDropdown;