import { AccountCircle, ExpandLess, ExpandMore, InfoOutline, Leaderboard, Person, Settings } from "@mui/icons-material";
import { Drawer, Box, Toolbar, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Collapse } from "@mui/material";
import { useState } from "react";

export const DRAWER_WIDTH = 240;

type SidebarProps = {
    isOpen: boolean;
    onToggleDrawer: () => void;
};

function Sidebar({ isOpen, onToggleDrawer }: SidebarProps) {
    const [isOpenSettings, setIsOpenSettings] = useState(false);

    const onSettingsClick = () => setIsOpenSettings(!isOpenSettings);


    const drawerContent = (
        <Box sx={{ bgcolor: "#32285c", height: "100%", color: "white", width: DRAWER_WIDTH }}>
            <Toolbar />
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: "white" }}><InfoOutline /></ListItemIcon>
                        <ListItemText primary="Info" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton onClick={onSettingsClick}>
                        <ListItemIcon sx={{ color: "white" }}><Settings /></ListItemIcon>
                        <ListItemText primary="Settings" />
                        {isOpenSettings ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                </ListItem>

                <Collapse in={isOpenSettings} timeout="auto" unmountOnExit>
                    <List disablePadding>
                        <ListItemButton sx={{ paddingLeft: 4 }}>
                            <ListItemIcon sx={{ color: "#ae9dd6" }}><Person /></ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItemButton>

                        <ListItemButton sx={{ paddingLeft: 4 }}>
                            <ListItemIcon sx={{ color: "#ae9dd6" }}><AccountCircle /></ListItemIcon>
                            <ListItemText primary="Account" />
                        </ListItemButton>
                    </List>
                </Collapse>


                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: "white" }}><Leaderboard /></ListItemIcon>
                        <ListItemText primary="Leaderboard" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>

            <Drawer variant="temporary" open={isOpen} onClose={onToggleDrawer}
                sx={{ display: { xs: "block", md: "none" } }}>
                {drawerContent}
            </Drawer>

            <Drawer variant="persistent" open
                sx={{ display: { xs: "none", md: "block" } }}
                slotProps={{ paper: { sx: { borderRight: "none" } } }}>
                {drawerContent}
            </Drawer>

        </Box>
    );
}

export default Sidebar;