import { Box, CssBaseline, Toolbar } from "@mui/material";
import Dashboard from "./components/Dashboard"
import MyAppBar from "./components/MyAppBar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import AssetRegistration from "./components/AssetRegistration";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const [isDashboard, setIsDashboard] = useState(true);
  const toggleContent = () => setIsDashboard(!isDashboard);


  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#16112c" }}>
      <CssBaseline />

      <MyAppBar onMenuClick={toggleSidebar} onContentChangeClick={toggleContent} />
      <Sidebar isOpen={isSidebarOpen} onToggleDrawer={toggleSidebar} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: "100%" }, }}>
        <Toolbar />
        {isDashboard ? (<Dashboard />) : (<AssetRegistration />)}
      </Box>

    </Box>
  )
}

export default App;
