import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import RotationCard from '../../components/Grazing/RotationCard'; //  SessionTable component!!!
import { Container, Box, Typography } from '@mui/material';
import GrazingSideBar from '../../components/Grazing/GrazingSideBar';
import GrazingDate from '../../components/Grazing/GrazingDate';
import Name from '../../components/Grazing/Name';
import NewTable from '../../components/Grazing/NewTable';

function RotationInfo() {
  const [rotations, setRotations] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:3000/api/sessions') 
      .then(response => {
        setRotations(response.data);
      })
      .catch(error => {
        console.error('Error fetching rotation details:', error);
      });
  }, []);

  return (
    <Box
      className="main-container"
      sx={{
        display: 'flex',
        minWidth: '1036px',
      }}
    >
      <GrazingSideBar />
      <Box className="dashboard-content2">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
        </Box>
        <Box className="dashboard-content">
                
                
                <Name/>
              
              
      </Box>
        <Container sx={{ margin: 16, marginLeft:'250px' ,marginTop: '20px' }}>
          <RotationCard rotations={rotations} />
          
          
        </Container>
        <div></div>
          <div></div>
        <Container sx={{ margin: 16, marginLeft:'250px' ,marginTop: '100px' }}>
          
         
          <NewTable/> 
        </Container>
      </Box>
    </Box>
  );
}

export default RotationInfo;
