import React from 'react';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { CodeBlock, TextT, Images, Pen, Square, LineSegment, ArrowUpRight, Circle, Shapes, Star, FileImage } from "@phosphor-icons/react";





export default function DropdownMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ maxWidth: '48px', maxHeight: '48px', minWidth: '48px', minHeight: '48px' }}
            >
                <div className="box-content h-8 w-8 p-2 hover:bg-black">
                    <Square size={32} color="#fff" />
                </div>
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
                        onClick={handleClose}

                    >
                        <ListItemIcon>
                            <Square size={20} color="#fff"/>
                        </ListItemIcon>
                        <ListItemText>Rectangle</ListItemText>
                        <Typography variant="body2" color="white">
                            R
                        </Typography>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <LineSegment size={20} color="#fff"/>
                        </ListItemIcon>
                        <ListItemText>Line</ListItemText>
                        <Typography variant="body2" color="white">
                            L
                        </Typography>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <ArrowUpRight size={20} color="#fff"/>
                        </ListItemIcon>
                        <ListItemText>Arrow</ListItemText>
                        <Typography variant="body2" color="white">
                            Shift + L
                        </Typography>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Circle size={20} color="#fff"/>
                        </ListItemIcon>
                        <ListItemText>Ellipse</ListItemText>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Shapes size={20} color="#fff"/>
                        </ListItemIcon>
                        <ListItemText>Polygon</ListItemText>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Star size={20} color="#fff"/>
                        </ListItemIcon>
                        <ListItemText>Star</ListItemText>
                    </MenuItem>

                    <MenuItem
                        onClick={handleClose}
                    >
                        <ListItemIcon>
                            <FileImage size={20} color="#fff"/>
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
