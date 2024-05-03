import React from "react";

import ProductionSidebar from "../../components/production/productionSidebar"
import Process_ingredientsTable from "../../components/production/Process_ingredientsTable"
import ProcessCard from "../../components/production/Process_cards"
import Process_resTable from "../../components/production/Process_resTable"
import Testdialog from "../../pages/Production/Testdialog"
import ProcessTable from "../../components/production/ProcessTable"
import { Container,Box,Typography,Button} from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2";

function ProcessPlanning() {
return (
<Container maxWidth="100vw" style={{ margin: 0, padding: 0,overflow:'hidden' }}>
  {/*, height: '100vh', overflow: 'hidden' */}

      <Grid2 container sx={{mt:4,ml:0,mr:0}} >
      <Grid2 item xs={1} sm={1}></Grid2>
        <Grid2 item xs={10} sm={6} sx={{ml:0}}><Typography variant="h4" fontWeight="bold" align="center">Processes</Typography></Grid2> 
        <Grid2 item xs={10} sm={5} sx={{ml:0}}><Typography variant="h4" fontWeight="bold" align="center">Equipements</Typography></Grid2> 
      </Grid2>


      <Grid2 container sx={{ width: '100vw', position: 'relative' ,ml:0}}>
        <Grid2 item xs={1} sm={1}><ProductionSidebar/></Grid2>
        <Grid2 item xs={10} sm={6} sx={{ml:0}}><ProcessCard/></Grid2> 
        <Grid2 item xs={10} sm={5} sx={{ml:0}}><Process_resTable/></Grid2> 
      </Grid2>

      <Grid2 container sx={{ width: '100vw', position: 'relative' ,mt:4 }}>
        <Grid2 item xs={1} sm={1}></Grid2>
        <Grid2 item xs={10} sm={3} sx={{ml:3}}></Grid2>
        <Grid2 item xs={10} sm={3} sx={{ml:5}} align="center"><Testdialog/></Grid2> 
        <Grid2 item xs={10} sm={4} sx={{ml:3}}></Grid2> 
      </Grid2>
      <Grid2 container sx={{ width: '100vw', position: 'relative' ,mt:6 }}>
        <Grid2 item xs={1} sm={1}></Grid2>
        <Grid2 item xs={10} sm={3} sx={{ml:3}}></Grid2>
        <Grid2 item xs={10} sm={3} sx={{ml:3}}  align="center"><Typography variant="h4" fontWeight="bold" align="center">All Processes</Typography></Grid2> 
        <Grid2 item xs={10} sm={4} sx={{ml:3}}></Grid2> 
      </Grid2>
     

      <Grid2 container sx={{mt:2,ml:5,mr:5}} >
        <Grid2 item xs={1}></Grid2> 
        <Grid2 item sm={11} align="center" ><ProcessTable/></Grid2>
      </Grid2>
    
      </Container>
    
    );
}

export default ProcessPlanning;