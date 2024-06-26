import React, { useState } from "react";
import NavigationLink from "../NavigationLink";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";


function Sidebar() {
  const [activeSection, setActiveSection] = useState("");

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  return (
    <Box
      className="sidebar"
      style={{
        width: '8.2%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000, // Adjust z-index if necessary
        overflowY: 'hidden',
        maxHeight: '100vh',  // Ensure the sidebar doesn't exceed viewport height
      }}
    >
      <Box className="sidebar-logo-container">
      <Link to="/homeM" style={{ textDecoration: 'none', color: 'inherit' }}>

        <img
          className="sidebar-logo"
          src="../../src/assets/sidebar-logo.png"
          alt="Logo"
        />
        </Link>
      </Box>

      {/* Navigation links */}
      <Box className="navigation-links">
        <List>
        <Link to="/productionDashboard" style={{ textDecoration: 'none', color: 'inherit' }}>

          <NavigationLink
            icon={<SpaceDashboardIcon />}
            text="Dashboard"
            isActive={activeSection === "dashboard"}
            onClick={() => handleNavigation("dashboard")}
          />
        </Link>
        <Link to="/processPlanning" style={{ textDecoration: 'none', color: 'inherit' }}>
          <NavigationLink
            icon={<AccessTimeFilledIcon />}
            text="Process"
            isActive={activeSection === "Process"}
            onClick={() => handleNavigation("Process")}
          />
         </Link>
          <Link to="/productInventory" style={{ textDecoration: 'none', color: 'inherit' }}>
          <NavigationLink
            icon={<WaterDropIcon />}
            text="Inventory"
            isActive={activeSection === "inventory"}
            onClick={() => handleNavigation("inventory")}
          />
          </Link>
          <Link to="/storageRoom" style={{ textDecoration: 'none', color: 'inherit' }}>
          <NavigationLink
            icon={<AssessmentIcon />}
            text="Storage"
            isActive={activeSection === "storage"}
            onClick={() => handleNavigation("storage")}
          />
          </Link>  
          <Link to="/Hydroponic" style={{ textDecoration: 'none', color: 'inherit' }}>
          <NavigationLink
            icon={<DonutSmallIcon />}
            text="Hydroponic"
            isActive={activeSection === "Hydroponic"}
            onClick={() => handleNavigation("Hydroponic")} 
          /> 
          </Link>
        </List>
      </Box>

      {/* Profile and Logout */}
      <Box className="user-actions">
        <List>
        <Link to="/ProductionProfile" style={{ textDecoration: 'none', color: 'inherit' }}>

          <NavigationLink
          
            icon={<AccountCircleIcon />}
            text="Profile"
            isActive={activeSection === "profile"}
            onClick={() => handleNavigation("profile")}
            path="/profile"
          />
          </Link>
          <Link to="/homeM" style={{ textDecoration: 'none', color: 'inherit' }}>

          <NavigationLink
            icon={<LogoutIcon />}
            text="Logout"
            isActive={activeSection === "logout"}
            onClick={() => handleNavigation("logout")}
            path="/logout"
          />
          </Link>
        </List>
      </Box>
    </Box>
  );
}

export default Sidebar;
