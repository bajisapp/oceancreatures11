import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import 'react-calendar/dist/Calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './time.css';



function Calender() {

  const [Remarks, setRemarks] = useState(''); 
    const navigate = useNavigate()
    const [calenderlist, setcalenderlist] = useState([])
    const localizer = momentLocalizer(moment)
    const [calendarEvents, setCalendarEvents] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null); 
    const [selectedEvents, setSelectedEvents] = useState([]); 
  
 const handleEventClick = (event) => {
  setSelectedEvents((prevSelectedEvents) => {
    const isEventSelected = prevSelectedEvents.some((selectedEvent) => selectedEvent.id === event.id);
    return isEventSelected
      ? prevSelectedEvents.filter((selectedEvent) => selectedEvent.id !== event.id)
      : [...prevSelectedEvents, event];
  });
};
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Selected Events:', selectedEvents);
      setSelectedEvent(selectedEvents); 
      setShowPopup(true); 
    };
    
    const closePopup = () => {
      setSelectedEvent(null);
      setShowPopup(false);
    };

    useEffect(() => {
      axios.get('https://oceancreaturesv10.onrender.com/getUserslist')
        .then((response) => {
          const events = response.data.map((user) => {
            const combinedDateTime = `${user.Date}T${user.ClassTime}`;
            const startDate = new Date(combinedDateTime);            
        const dateString = user.Date; 
        const dateObject = new Date(dateString);
        const formattedDate = dateObject.toISOString().split('T')[0]; 
        const endtime = user.ClassTime ;
const userClassTime = `${user.ClassTime}:00`; 
const durationToAdd = '00:45:00'; 
console.log('userClassTime', userClassTime);
const [userHours, userMinutes, userSeconds] = userClassTime.split(':').map(Number);
const [durationHours, durationMinutes, durationSeconds] = durationToAdd.split(':').map(Number);
let totalHours = userHours + durationHours;
let totalMinutes = userMinutes + durationMinutes;
let totalSeconds = userSeconds + durationSeconds;
totalMinutes += Math.floor(totalSeconds / 60);
totalSeconds %= 60;
totalHours += Math.floor(totalMinutes / 60);
totalMinutes %= 60;
totalHours %= 24; 
const formattedEndTime = `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;
console.log('formatted end time:', formattedEndTime)
console.log(formattedEndTime); 
        const startDateTime = `${formattedDate}T${user.ClassTime}:00`;
        const endDateTime = `${formattedDate}T${formattedEndTime}`;
        console.log('startDateTime:', startDateTime);
        console.log('End Time:', endDateTime);          
            const endDate = new Date(startDate.getTime() + user.ClassDuration * 60000);
            return {
              _id: user._id,
              id: user.UserID,
              title: user.Status == "none" ? (
                <span style={{ backgroundColor: '#ddd', padding:'6px', borderRadius:'5px', color: '#333' }}>{user.Name + '-' + user.ClassTime}</span>
              ) : user.Status === "present" ? (
                <span style={{ backgroundColor: '#009688', padding:'4px', borderRadius:'3px', marginBottom:'2px', color: '#fff' }}>{user.Name + '-' + user.ClassTime}</span>
              ) : (
                <span style={{ backgroundColor: '#ff5722', padding:'4px', borderRadius:'3px', marginBottom:'2px', color: '#fff' }}>{user.Name + '-' + user.ClassTime}</span>
              ),
              start: new Date(startDateTime), 
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
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <input
            type="checkbox"
            checked={selectedEvents.some((selectedEvent) => selectedEvent._id === event._id)}
            onChange={() => handleEventClick(event)}
            style={{ marginRight: '5px' }} />        
          <span
            className={`event-label ${selectedEvents.some((selectedEvent) => selectedEvent._id === event._id) ? 'selected' : ''}`}>
           {event.title}
          </span>
        </label>
      </div>
    );



const Update = (e) => {
  e.preventDefault();
  const Statusresult = 'present';
  selectedEvents.forEach((selectedEvent) => {
    const _id = selectedEvent._id;
    const remarksData = { Status: Statusresult, Remarks: Remarks };    
    axios
      .put(`https://oceancreaturesv10.onrender.com/updateattendance/${_id}`, remarksData)
      .then((result) => {
        console.log('id:', _id);
        console.log('Remarks:', Remarks);
        console.log('Status:', Statusresult);
        console.log(remarksData.Remarks);
        console.log('test');
      })
      .catch((err) => {
        console.error('Error updating attendance:', err);
      });
  });
  alert('Submitted, Click on OK button to proceed.');
  navigate('/schedul/erList');
};


const Updateabsent = (e) => {
  e.preventDefault();  
  const Statusresult = 'absent';  
  selectedEvents.forEach((selectedEvent) => {
    const _id = selectedEvent._id;
    const remarksData = { Status: Statusresult, Remarks: Remarks };
    axios
      .put(`https://oceancreaturesv10.onrender.com/updateattendance/${_id}`, remarksData)
      .then((result) => {
        console.log('id:', _id);
        console.log('Remarks:', Remarks);
        console.log('Status:', Statusresult);
        console.log(remarksData.Remarks);
        console.log('test');
      })
      .catch((err) => {
        console.error('Error updating attendance:', err);
      });
  });  
  alert('Submitted, Click on OK button to proceed.');
  navigate('/schedulerList');
};
  
  return (
    <div>
      <div class="row">
    <div class="col-12">
<div style={{backgroundColor:'#fff', padding:'10px'}}> 
  <button className="btn btn-dark btn-sm" style={{marginBottom:'10px'}} onClick={handleSubmit}>
       Submit
      </button>
      <Calendar
  localizer={localizer}
  events={calendarEvents}
  views={{ month: true, week: false, day: false, agenda: true }}
  min={new Date(0, 0, 0, 9, 0, 0)}
  max={new Date(0, 0, 0, 20, 0, 0)}
  defaultView="agenda" 
  startAccessor="start"
  showAllEvents={true}
  step={30} 
  timeslots={2} 
  defaultDate={new Date()} 
  selectable={true}
  endAccessor="end"
  length={7} 
  style={{ height: 800, fontSize: '11px' }}
  components={{
    agenda: {
      event: CustomAgenda,
      //agenda: CustomAgendas,
    },
  }}
/>
</div>
</div>
</div>
 
 
    {showPopup && selectedEvent && (
  <div className="popup" >
    <div className="popup-inner" style={{}}>

    <span style={{ color: '#000' }}>Student name: {selectedEvents.map(event => (
  <span key={event.id} style={{ marginRight: '5px', fontSize: '9px', padding: '1px' , marginTop: '2px'}}>
    {event.title}
  </span>
))}</span>
 

       
      <textarea className='form-control' value={Remarks}  onChange={(e) => setRemarks(e.target.value)}>
  
</textarea>


<span style={{ color: '#000', display: 'none' }}>Event ID:: {selectedEvents.map(event => (
  <span key={event.id} style={{ marginRight: '5px' }}>
    {event.id}
  </span>
))}</span>
   

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
