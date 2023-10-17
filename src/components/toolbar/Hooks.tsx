import React from 'react';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import { CodeBlock, TextT, Cursor, Pen, Square, LineSegment, ArrowUpRight, Circle, Shapes, Star, FileImage } from "@phosphor-icons/react";

interface DropdownMenuProps {
    buttonType?: string;
}


export default function DropdownMenu({ buttonType, openButton, setOpenButton }) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const fileInput = React.useRef(null);

    const [selectedItem, setSelectedItem] = React.useState("rectangle");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setIsDropdownOpen(!isDropdownOpen);
        if (openButton !== buttonType) {
            setOpenButton(buttonType);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };




    if (buttonType === "square") {
        return (


            <div>
                <input type="file" ref={fileInput} style={{ display: 'none' }} />
                <Button
                    disableRipple
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                    style={{
                        maxWidth: '48px',
                        maxHeight: '48px',
                        minWidth: '48px',
                        minHeight: '48px',
                        backgroundColor: openButton === buttonType ? '#486cf0' : 'transparent',
                        borderRadius: '0px'
                    }}
                >

                    {openButton === buttonType && (<div className="box-content h-8 w-8 p-2 hover:bg-[#2f479e]">
                        {selectedItem === "rectangle" && <Square size={32} color="#fff" />}
                        {selectedItem === "line" && <LineSegment size={32} color="#fff" />}
                        {selectedItem === "arrow" && <ArrowUpRight size={32} color="#fff" />}
                        {selectedItem === "ellipse" && <Circle size={32} color="#fff" />}
                        {selectedItem === "polygon" && <Shapes size={32} color="#fff" />}
                        {selectedItem === "star" && <Star size={32} color="#fff" />}
                    </div>)}

                    {!(openButton === buttonType) && (<div className="box-content h-8 w-8 p-2 hover:bg-black">
                        {selectedItem === "rectangle" && <Square size={32} color="#fff" />}
                        {selectedItem === "line" && <LineSegment size={32} color="#fff" />}
                        {selectedItem === "arrow" && <ArrowUpRight size={32} color="#fff" />}
                        {selectedItem === "ellipse" && <Circle size={32} color="#fff" />}
                        {selectedItem === "polygon" && <Shapes size={32} color="#fff" />}
                        {selectedItem === "star" && <Star size={32} color="#fff" />}
                    </div>)}

                </Button>

                <Menu

                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                        component: Paper,
                        sx: { width: 320, maxWidth: '100%', backgroundColor: '#3a3a3a', border: '2px solid #4e4e4e' },
                    }}
                >
                    <MenuList dense>

                        <MenuItem
                            selected={"rectangle" === selectedItem}
                            onClick={() => setSelectedItem("rectangle")}
                            disableRipple
                        >
                            <ListItemIcon>
                                <Square size={20} color="#fff" />
                            </ListItemIcon>
                            <ListItemText>Rectangle</ListItemText>
                            <Typography variant="body2" color="white">
                                R
                            </Typography>
                        </MenuItem>

                        <MenuItem
                            selected={"line" === selectedItem}
                            onClick={() => setSelectedItem("line")}
                            disableRipple
                        >
                            <ListItemIcon>
                                <LineSegment size={20} color="#fff" />
                            </ListItemIcon>
                            <ListItemText>Line</ListItemText>
                            <Typography variant="body2" color="white">
                                L
                            </Typography>
                        </MenuItem>

                        <MenuItem
                            selected={"arrow" === selectedItem}
                            onClick={() => setSelectedItem("arrow")}
                            disableRipple
                        >
                            <ListItemIcon>
                                <ArrowUpRight size={20} color="#fff" />
                            </ListItemIcon>
                            <ListItemText>Arrow</ListItemText>
                            <Typography variant="body2" color="white">
                                Shift + L
                            </Typography>
                        </MenuItem>

                        <MenuItem
                            selected={"ellipse" === selectedItem}
                            onClick={() => setSelectedItem("ellipse")}
                            disableRipple
                        >
                            <ListItemIcon>
                                <Circle size={20} color="#fff" />
                            </ListItemIcon>
                            <ListItemText>Ellipse</ListItemText>
                        </MenuItem>

                        <MenuItem
                            selected={"polygon" === selectedItem}
                            onClick={() => setSelectedItem("polygon")}
                            disableRipple
                        >
                            <ListItemIcon>
                                <Shapes size={20} color="#fff" />
                            </ListItemIcon>
                            <ListItemText>Polygon</ListItemText>
                        </MenuItem>

                        <MenuItem
                            selected={"star" === selectedItem}
                            onClick={() => setSelectedItem("star")}
                            disableRipple
                        >
                            <ListItemIcon>
                                <Star size={20} color="#fff" />
                            </ListItemIcon>
                            <ListItemText>Star</ListItemText>
                        </MenuItem>

                        <MenuItem
                            disableRipple
                            onClick={() => {
                                fileInput.current.click();
                                handleClose();
                                setSelectedItem("rectangle");
                            }}
                        >
                            <ListItemIcon>
                                <FileImage size={20} color="#fff" />
                            </ListItemIcon>
                            <ListItemText>Custom</ListItemText>
                            <Typography variant="body2" color="white">
                                Cntrl + Shift + K
                            </Typography>
                        </MenuItem>

                    </MenuList>

                </Menu>

            </div>
        );
    }
    else if (buttonType === "CodeBlock") {
        return (
            <Button
                disableRipple
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{
                    maxWidth: '48px',
                    maxHeight: '48px',
                    minWidth: '48px',
                    minHeight: '48px',
                    backgroundColor: openButton === buttonType ? '#486cf0' : 'transparent',
                    borderRadius: '0px'
                }}
            >
                {openButton === buttonType && (<div className="box-content h-8 w-8 p-2 hover:bg-[#2f479e]"><CodeBlock size={32} color="#fff" />
                </div>)}

                {!(openButton === buttonType) && (<div className="box-content h-8 w-8 p-2 hover:bg-black"><CodeBlock size={32} color="#fff" />
                </div>)}
            </Button>
        );
    }
    else if (buttonType === "TextT") {
        return (
            <Button
                disableRipple
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{
                    maxWidth: '48px',
                    maxHeight: '48px',
                    minWidth: '48px',
                    minHeight: '48px',
                    backgroundColor: openButton === buttonType ? '#486cf0' : 'transparent',
                    borderRadius: '0px'
                }}
            >
                {openButton === buttonType && (<div className="box-content h-8 w-8 p-2 hover:bg-[#2f479e]"><TextT size={32} color="#fff" />
                </div>)}

                {!(openButton === buttonType) && (<div className="box-content h-8 w-8 p-2 hover:bg-black"><TextT size={32} color="#fff" />
                </div>)}
            </Button>
        );
    }

    else if (buttonType === "Cursor") {
        return (
            <Button
                disableRipple
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{
                    maxWidth: '48px',
                    maxHeight: '48px',
                    minWidth: '48px',
                    minHeight: '48px',
                    backgroundColor: openButton === buttonType ? '#486cf0' : 'transparent',
                    borderRadius: '0px'
                }}            >

                {openButton === buttonType && (<div className="box-content h-8 w-8 p-2 hover:bg-[#2f479e]"><Cursor size={32} color="#fff" />
                </div>)}

                {!(openButton === buttonType) && (<div className="box-content h-8 w-8 p-2 hover:bg-black"><Cursor size={32} color="#fff" />
                </div>)}

            </Button>
        );
    }

    else if (buttonType === "Pen") {
        return (
            <Button
                disableRipple
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{
                    maxWidth: '48px',
                    maxHeight: '48px',
                    minWidth: '48px',
                    minHeight: '48px',
                    backgroundColor: openButton === buttonType ? '#486cf0' : 'transparent',
                    borderRadius: '0px'
                }}            >

                {openButton === buttonType && (<div className="box-content h-8 w-8 p-2 hover:bg-[#2f479e]"><Pen size={32} color="#fff" />
                </div>)}

                {!(openButton === buttonType) && (<div className="box-content h-8 w-8 p-2 hover:bg-black"><Pen size={32} color="#fff" />
                </div>)}

            </Button>
        );
    }


}