import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UpdateUser from './UpdateUser'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import 'react-calendar/dist/Calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Scheduler from 'devextreme-react/scheduler';

const currentDate = new Date(2023, 1, 29);
const views = ['day', 'week', 'workWeek', 'month'];


function Schedulerdev () {

    const navigate = useNavigate()

    const [calenderlist, setcalenderlist] = useState([])

    const localizer = momentLocalizer(moment)

    const [calendarEvents, setCalendarEvents] = useState([]);


 const data = [
        {
          text: 'Website Re-Design Plan',
          startDate: new Date('2023-04-26T16:30:00.000Z'),
          endDate: new Date('2023-04-26T18:30:00.000Z'),
        },
        {
          text: 'Book Flights to San Fran for Sales Trip',
          startDate: new Date('2023-04-26T19:00:00.000Z'),
          endDate: new Date('2023-04-26T20:00:00.000Z'),
          allDay: true,
        },
        {
          text: 'Install New Router in Dev Room',
          startDate: new Date('2023-04-26T21:30:00.000Z'),
          endDate: new Date('2023-04-26T22:30:00.000Z'),
        },
        {
          text: 'Approve Personal Computer Upgrade Plan',
          startDate: new Date('2023-04-27T17:00:00.000Z'),
          endDate: new Date('2023-04-27T18:00:00.000Z'),
        },
        {
          text: 'Final Budget Review',
          startDate: new Date('2023-04-27T19:00:00.000Z'),
          endDate: new Date('2023-04-27T20:35:00.000Z'),
        },
        {
          text: 'New Brochures',
          startDate: new Date('2023-04-27T21:30:00.000Z'),
          endDate: new Date('2023-04-27T22:45:00.000Z'),
        },
        {
          text: 'Install New Database',
          startDate: new Date('2023-04-28T16:45:00.000Z'),
          endDate: new Date('2023-04-28T18:15:00.000Z'),
        },
        {
          text: 'Approve New Online Marketing Strategy',
          startDate: new Date('2023-04-28T19:00:00.000Z'),
          endDate: new Date('2023-04-28T21:00:00.000Z'),
        },
        {
          text: 'Upgrade Personal Computers',
          startDate: new Date('2023-04-28T22:15:00.000Z'),
          endDate: new Date('2023-04-28T23:30:00.000Z'),
        },
        {
          text: 'Customer Workshop',
          startDate: new Date('2023-04-29T18:00:00.000Z'),
          endDate: new Date('2023-04-29T19:00:00.000Z'),
          allDay: true,
        },
        {
          text: 'Prepare 2023 Marketing Plan',
          startDate: new Date('2023-04-29T18:00:00.000Z'),
          endDate: new Date('2023-04-29T20:30:00.000Z'),
        },
        {
          text: 'Brochure Design Review',
          startDate: new Date('2023-04-29T21:00:00.000Z'),
          endDate: new Date('2023-04-29T22:30:00.000Z'),
        },
        {
          text: 'Create Icons for Website',
          startDate: new Date('2023-04-30T17:00:00.000Z'),
          endDate: new Date('2023-04-30T18:30:00.000Z'),
        },
        {
          text: 'Upgrade Server Hardware',
          startDate: new Date('2023-04-30T21:30:00.000Z'),
          endDate: new Date('2023-04-30T23:00:00.000Z'),
        },
        {
          text: 'Submit New Website Design',
          startDate: new Date('2023-04-30T23:30:00.000Z'),
          endDate: new Date('2023-05-01T01:00:00.000Z'),
        },
        {
          text: 'Launch New Website',
          startDate: new Date('2023-04-30T19:20:00.000Z'),
          endDate: new Date('2023-04-30T21:00:00.000Z'),
        },
      ];
  

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
      axios.get('https://oceancreaturesv10.onrender.com/getUserslist')
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
              id: user.UserID,
              title: user.Name,
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
    


  return (
    <div>


      <div class="row">
    <div class="col-2">

    </div>
    <div class="col-8">

      
    <Scheduler
    timeZone="America/Los_Angeles"
    dataSource={data}
    views={views}
    defaultCurrentView="day"
    defaultCurrentDate={currentDate}
    height={730}
    startDayHour={9}
  />

      <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 800 }}
    />

</div>
<div class="col-2">
   
    </div>
    </div>

  </div>

   
  )
}

export default Schedulerdev
