import React, { useState, useEffect } from 'react';
import { Card, Paper, Typography, LinearProgress, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import axios from 'axios';

const preparationTimes = {
  'Chocolate Icecream': 3,
  'Vanilla Icecream': 2,
  'Yoghurt': 2,
  'Milk': 1
};

const stageTimes = {

  'Mixing': 0.3,
  'Pasteurization': 0.7,
  'Homogenization': 1,
  'Freezing':36000 
  
};

function ProcessCardContainer() {
  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 1000); // Fetch data every second 
  
    return () => clearInterval(intervalId); // Clear the interval
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/processCrud/processes');
      const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

      const filteredProcesses = response.data.filter(process => {

        if (process.status === 'started') {
          const startDate = new Date(process.startTime).toISOString().split('T')[0]; // Get start date of the process
          
          if (startDate === currentDate) {
            return true; // Show processes started today
          } 
          
          else {
            return false; // Hide other processes
          }
        }
        
        else if (process.status === 'scheduled' ) 
        {
          const [scheduleHours, scheduleMinutes] = process.scheduleTime.split(':').map(Number);

          // Get start date of the process
          const schDate = new Date(process.scheduleDate).toISOString().split('T')[0]; 
          
          // Get current time
          const currentTime = new Date();
          const currentHours = currentTime.getHours()
          const currentMinutes = currentTime.getMinutes() 
          //console.log('sch time',scheduleHours,scheduleMinutes);
          console.log('cur time ',currentHours,currentMinutes);

        /*
        check this in morning A.M
          if (schDate === currentDate){

            const scheduleDate = new Date(process.scheduleDate);
            const scheduledTimeParts = process.scheduleTime.split(':');
            const scheduledHour = parseInt(scheduledTimeParts[0]);
            const scheduledMinute = parseInt(scheduledTimeParts[1]);
            const scheduledSecond = parseInt(scheduledTimeParts[2] || 0); // Handle missing seconds

            // Combine date from scheduleDate and time from scheduleTime
            const scheduledDateTime1 = new Date(
              scheduleDate.getFullYear(),
              scheduleDate.getMonth(),
              scheduleDate.getDate(),
              scheduledHour,
              scheduledMinute,
              scheduledSecond
            );

              if(scheduledDateTime1 <= currentTime)
                {
                 return true; //  scheduled processes in curent date
                }
               else
               {
                  return false; // Hide other processes
               }  

          } */
          if ((schDate === currentDate &&
             (currentHours > scheduleHours || 
            ( currentHours === scheduleHours && currentMinutes >= scheduleMinutes))))
          {
            return true; //  scheduled processes in curent date
          }
          else
          {
            return false; // Hide other processes
          }  

        } //end els if
        else{
          return false; // Hide other processes
        }
    
    });


      const updatedProcesses = filteredProcesses.map(process => {
        
                  // Convert the startTime object to a Date object
       // Convert the startTime object to a Date object
          let startTime = new Date(process.startTime);

          if (process.status === 'scheduled' && process.scheduleDate && process.scheduleTime) {
            // Extract the date and time components from the database fields
            const scheduleDate = new Date(process.scheduleDate);
            const scheduledTimeParts = process.scheduleTime.split(':');
            const scheduledHour = parseInt(scheduledTimeParts[0]);
            const scheduledMinute = parseInt(scheduledTimeParts[1]);
            const scheduledSecond = parseInt(scheduledTimeParts[2] || 0); // Handle missing seconds

            // Combine date from scheduleDate and time from scheduleTime
            const scheduledDateTime = new Date(
              scheduleDate.getFullYear(),
              scheduleDate.getMonth(),
              scheduleDate.getDate(),
              scheduledHour,
              scheduledMinute,
              scheduledSecond
            );

            // Set the scheduled date and time to the startTime object
            startTime = scheduledDateTime;
          } 

          console.log('Scheduled time:', process.scheduleTime); // Log scheduled time
          console.log('startTime:', startTime); // Log startTime


        const currentTime = new Date(); // Current time
        const elapsedTime = currentTime - startTime; // Elapsed time since start
        const stage = getCurrentStage(elapsedTime);
        const totalTime =  2 * 60 * 1000; // Total time in milliseconds
        let remainingTime;
        let timeRemaining;
        let progress;
        let isCompleted;

  
        if (elapsedTime >= totalTime) {
          remainingTime = 0;
          timeRemaining = 'Completed!';
          progress = 100;
          isCompleted = true;
        } else {
          remainingTime = totalTime - elapsedTime; // Remaining time for the process
          timeRemaining = formatTime(remainingTime); // Format remaining time
          progress = (elapsedTime / totalTime) * 100; // Calculate progress
          isCompleted = false;
        }
  
        return { ...process, stage, timeRemaining, progress, isCompleted };
      });
      setProcesses(updatedProcesses);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const getCurrentStage = (elapsedTime) => {
    let totalElapsedTime = elapsedTime;
    let currentStage = null;
    for (const [stage, time] of Object.entries(stageTimes)) {
      if (totalElapsedTime <= time * 60 * 1000) {
        currentStage = stage;
        break;
      }
      totalElapsedTime -= time * 60 * 1000;
    }
    return currentStage;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / (1000 * 60));
    const seconds = Math.floor((time / 1000) % 60);
    return `${minutes} min ${seconds} sec`;
  };

  return (
    <div style={{ marginTop: '20px', maxHeight: '70vh', overflowY: 'auto', padding: 0 }}>
      <Paper sx={{ maxWidth: '100%', height: '100%', background: 'rgba(25, 255, 255, 0.0)', ml: 0, overflowY: 'hidden', padding: 0 }}>
        <Stack spacing={2}>
          {processes.map(process => (
            <Grid key={process.id} item xs={12}>
              <Card sx={{ borderRadius: 5, width: '100%', background: process.isCompleted ? 'lightgreen' : 'rgba(255, 255, 255, 0.8)', ml:0 }}>
                <div style={{ padding: '10px', marginLeft: '12px' }}>
                  <Typography variant="h5" sx={{fontWeight: 'bold'}}>{process.product}</Typography>
                  <Typography><span style={{ fontWeight: 'bold' }}>Amount:</span> {process.milkQuantity} liters</Typography>                  
                  <Typography><span style={{fontWeight: 'bold'}}>Current Stage:</span> {process.stage}</Typography>
                 {/* <Typography><span style={{ fontWeight: 'bold' }}>Status:</span> {process.status}</Typography> */}
                  <LinearProgress variant="determinate" value={process.progress} sx={{ height: 20, width: '95%',borderRadius:5,mt:1, }} />
                  <Typography><span style={{fontWeight: 'bold'}}>Time Remaining:</span> {process.timeRemaining}</Typography>
                </div>
              </Card>
            </Grid> 
          ))}
        </Stack>
      </Paper>
      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default ProcessCardContainer;
