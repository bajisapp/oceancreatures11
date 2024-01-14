import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UpdateUser from './UpdateUser'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import 'react-calendar/dist/Calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './time.css';




function Calender() {

  const [Remarks, setRemarks] = useState(''); // State to capture remarks

    const navigate = useNavigate()

    const [calenderlist, setcalenderlist] = useState([])

    const localizer = momentLocalizer(moment)

    const [calendarEvents, setCalendarEvents] = useState([]);

    const [showPopup, setShowPopup] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null); // Add selectedEvent state
  
    // ... (other states and useEffect)
  
    // Function to handle the click on the button
    const handleEventClick = (event) => {
      setSelectedEvent(event); // Set the selected event details
      setShowPopup(true); // Show the popup/modal
    };
  
    // Function to close the popup/modal
    const closePopup = () => {
      setSelectedEvent(null);
      setShowPopup(false);
    };

    const myEventsList = [
      {
        id: 1,
        title: 'Jarius',
        start: new Date('2024-01-07T15:00:00'), 
        end: new Date('2024-01-07T16:00:00') 
      },
      {
        id: 2,
        title: 'Andrea Lee',
        start: new Date('2024-01-07T15:00:00'), // Should be a Date object
        end: new Date('2024-01-07T16:00:00')
      }  
    ];



    useEffect(() => {
      axios.get('http://localhost:3002/getUserslist')
        .then((response) => {
          const events = response.data.map((user) => {
            // Ensure user.Date and user.ClassTime are valid strings in ISO 8601 format
            const combinedDateTime = `${user.Date}T${user.ClassTime}`;
            const startDate = new Date(combinedDateTime);

            
        const dateString = user.Date; // Assuming listb.Date is in the format '2024-01-06'
        const dateObject = new Date(dateString);

        // Format the date to display in the table (without time)
        const formattedDate = dateObject.toISOString().split('T')[0]; // Extract only the date part 

        const endtime = user.ClassTime ;


        // Assuming user.ClassTime is a string in 'HH:MM:SS' format
const userClassTime = `${user.ClassTime}:00`; // Replace this with your user's class time
const durationToAdd = '00:45:00'; // Duration to add
console.log('userClassTime', userClassTime);
// Split the time strings into hours, minutes, and seconds
const [userHours, userMinutes, userSeconds] = userClassTime.split(':').map(Number);
const [durationHours, durationMinutes, durationSeconds] = durationToAdd.split(':').map(Number);

// Calculate the total hours, minutes, and seconds
let totalHours = userHours + durationHours;
let totalMinutes = userMinutes + durationMinutes;
let totalSeconds = userSeconds + durationSeconds;

// Adjust for overflow
totalMinutes += Math.floor(totalSeconds / 60);
totalSeconds %= 60;
totalHours += Math.floor(totalMinutes / 60);
totalMinutes %= 60;
totalHours %= 24; // Ensure the hours do not exceed 24 (for the next day)

// Format the result with leading zeroes
const formattedEndTime = `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;
console.log('formatted end time:', formattedEndTime)

console.log(formattedEndTime); // Output: 20:30:00


        const startDateTime = `${formattedDate}T${user.ClassTime}:00`;
        const endDateTime = `${formattedDate}T${formattedEndTime}`;
        console.log('startDateTime:', startDateTime);
        console.log('End Time:', endDateTime);
        //console.log(endDateTime);
            
            // Assuming user.ClassDuration is in minutes
          
            const endDate = new Date(startDate.getTime() + user.ClassDuration * 60000);
        //    console.log('test' , startDate);
        //    console.log('combinedate', combinedDateTime);
            return {
              _id: user._id,
              id: user.UserID,
              title: user.Status == "none" ? (
                <span style={{ backgroundColor: '#ddd', padding:'6px', borderRadius:'5px', color: '#333' }}>{user.ClassTime + '-' + user.Name}</span>
              ) : user.Status === "present" ? (
                <span style={{ backgroundColor: '#009688', padding:'6px', borderRadius:'5px', color: '#fff' }}>{user.ClassTime + '-' + user.Name}</span>
              ) : (
                <span style={{ backgroundColor: '#ff5722', padding:'6px', borderRadius:'5px', color: '#fff' }}>{user.ClassTime + '-' + user.Name}</span>
              ),
              start: new Date(startDateTime), // Should be a Date object
              end: new Date(endDateTime)
                
            };
          });
          setCalendarEvents(events);
        })
        .catch((error) => {
          console.error('Error fetching calendar data:', error);
        });
    }, []);
    
  

  const CustomAgenda = ({ event }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>{event.title}</span>
      <button className='btn btn-dark btn-sm' style={{fontSize:'11px'}} onClick={() => handleEventClick(event)}> Attendance <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg> </button>
    </div>
  );

  const formatDate = (date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
  
    });
  };


  const handleRemarksChange = (event) => {
    setRemarks(event.target.value); // Update remarks in state
  };

  const Update = (e) => {
    e.preventDefault();
    const _id = selectedEvent._id;
    const Statusresult = 'present';
    const remarksData = { Status: Statusresult, Remarks: Remarks }; // Assuming Remarks is defined

    axios
        .put(`http://localhost:3002/updateattendance/${_id}`, remarksData)
        .then((result) => {
            console.log('id:', _id)
            console.log('Remarks:', Remarks);
            console.log('Status:', Statusresult);
            console.log(remarksData.Remarks);
            console.log('test');
            alert('Submitted, Click on OK button to proceed.');
            navigate('/calender');

        })
        .catch((err) => {
            console.error('Error updating attendance:', err);
        });
};

const Updateabsent = (e) => {
  e.preventDefault();
  const _id = selectedEvent._id;
  const Statusresult = 'absent';
  const remarksData = { Status: Statusresult, Remarks: Remarks }; 

  axios
      .put(`http://localhost:3002/updateattendance/${_id}`, remarksData)
      .then((result) => {
          console.log('id:', _id)
          console.log('Remarks:', Remarks);
          console.log('Status:', Statusresult);
          console.log(remarksData.Remarks);
          console.log('test');
          alert('Submitted, Click on OK button to proceed.');
          navigate('/calender');
      })
      .catch((err) => {
          console.error('Error updating attendance:', err);
      });
};

  
  return (
    <div>


      <div class="row">
    <div class="col-2">

    </div>
    <div class="col-8">
<div style={{backgroundColor:'#fff', padding:'10px'}}>
      


      <Calendar
      localizer={localizer}
      events={calendarEvents}
      views={{ month: true, week: false, day: false, agenda: true }}
      min={new Date(0, 0, 0, 9, 0, 0)}
      max={new Date(0, 0, 0, 20, 0, 0)}
      defaultView="agenda" 
      startAccessor="start"
      showAllEvents={true}
      endAccessor="end"
      length={7} 
       style={{ height: 800, fontSize:'11px' }}
       components={{
        agenda: {
          event: CustomAgenda,
        },
      }}
    />

</div>

</div>
<div class="col-2">
   
    </div>
    </div>
 
 
    {showPopup && selectedEvent && (
  <div className="popup" >
    <div className="popup-inner" style={{width:'350px'}}>
      <h4>{selectedEvent.title}</h4>
      <p>Date: {formatDate(selectedEvent.start) }</p> 
       
      <textarea className='form-control' value={Remarks}  onChange={(e) => setRemarks(e.target.value)}>
  
</textarea>
      <div style={{fontSize:'12px',display:'none', marginBottom:'10px'}}>
        <strong style={{}}>Event ID:</strong> {selectedEvent._id}
      </div>

      <button onClick={closePopup} className='btn btn-sm btn-dark' style={{marginRight:'10px', marginTop:'5px'}} > <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="bi bi-x-mg" viewBox="0 0 16 16">
  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
</svg> Close </button>

      <button onClick={Update} className='btn btn-sm btn-success'  style={{marginRight:'10px', marginTop:'5px'}}  > <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
</svg> Present</button>
      
      <button onClick={Updateabsent} className='btn btn-sm btn-danger' style={{marginRight:'10px', marginTop:'5px'}}  ><svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
</svg> Absent</button>
    </div>
  </div>
)}

  </div>

   
  )
}

export default Calender
