import { Menu } from "@mui/icons-material";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";

export type AppBarProps = {
    appName?: string;
    onMenuClick: () => void;
    onContentChangeClick: () => void;
};

function MyAppBar({ appName = "Metric Dashboard App", onMenuClick, onContentChangeClick }: AppBarProps) {
    return (
        <AppBar position="fixed" sx={{ bgcolor: "#54458b", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                {/* get it from documentation */}
                <IconButton size="large" edge="start" color="inherit" aria-label="menu"
                    sx={{ mr: 2, display: { md: "none" } }} onClick={onMenuClick}>
                    <Menu />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}> {appName} </Typography>
                <Button color="inherit" onClick={onContentChangeClick}>Change main content</Button>
            </Toolbar>
        </AppBar>
    );
}

export default MyAppBar;