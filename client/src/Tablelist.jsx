import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UpdateUser from './UpdateUser'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import 'react-calendar/dist/Calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Table } from 'react-bootstrap'




function Tablelist() {

    const navigate = useNavigate()

    const [calenderlist, setcalenderlist] = useState([])

    const localizer = momentLocalizer(moment)

   useEffect(() => {
      axios.get('https://oceancreaturesv10.onrender.com/getUserslist')
      .then(calenderlist =>  {

      setcalenderlist(calenderlist.data);
      console.log(calenderlist)
    } )
      .catch(err => console.log(err))
   }, [])


   const getStatusColor = (status) => {
    let backgroundColor, textColor, padding, borderRadius, fontSize, display; // Declare padding variable
    
    if (status === 'present') {
      backgroundColor = 'green';
       textColor = 'white'; // Change the text color for "present"
      padding = '5px';
      borderRadius = '0px';
      fontSize = '2px';
      
      
    } else if (status === 'absent') {
      backgroundColor = 'orange';
      textColor = 'black'; // Change the text color for "absent"
      padding = '5px';
      borderRadius = '0px';
      fontSize = '2px';
    } else if (status === 'none') {
        backgroundColor = '#ddd';
        textColor = 'black'; // Change the text color for "absent"
        padding = '5px';
        borderRadius = '6px';
        fontSize = '2px';
      }  else {
      backgroundColor = '#ddd';
      textColor = 'black';
        padding = '0px'; // Change the default text color
      borderRadius = '0px';
      fontSize = '0px';
      display = 'none';
    }
    
    return { backgroundColor, color: textColor, padding, borderRadius , fontSize, display};
  };

   const uniqueUserID = [...new Set(calenderlist.map(item => item.UserID))];
   const uniqueDates = [...new Set(calenderlist.map(item => item.Date.split('T')[0]))];
   const uniqueNames = [...new Set(calenderlist.map(item => item.Name))];
   // Add 'ClassLocation' to the list of unique properties
    const uniqueClassLocations = [...new Set(calenderlist.map(item => item.ClassLocation))];

   //const uniqueStatus = [...new Set(calenderlist.map(item => item.Status))]; 
   const sortedDates = uniqueDates.slice().sort((a, b) => new Date(a) - new Date(b));
   const sortedUniqueNamess = [...uniqueNames].sort((a, b) => {
    // Assuming calenderlist is an array of objects and each object has a 'Name' property
    const nameA = a.toLowerCase();
    const nameB = b.toLowerCase();
    
    // Use localeCompare for case-insensitive alphabetical sorting
    return nameA.localeCompare(nameB);
  });

// Sort based on "Class Day" and "Class Time"
const sortedUniqueNames = [...uniqueNames].sort((nameA, nameB) => {
    const userA = calenderlist.find((item) => item.Name === nameA);
    const userB = calenderlist.find((item) => item.Name === nameB);
  
    if (userA && userB) {
      // Compare "Class Day" and then "Class Time" if "Class Day" is equal
      return userA.ClassDay.localeCompare(userB.ClassDay) || userA.ClassTime.localeCompare(userB.ClassTime);
    }
    return 0; // Default to no change in order if user data is missing
  });

  return (
    <div style={{overflowX: "scroll", overflowY: 'scroll'}}>
         <table className='table table-striped table-bordered'>
        <thead className='table-dark'>
            <tr>
            <th style={{display:'none'}}> UserID </th>
            <th> <span >Loc..</span> </th>
            <th style={{ width:'30px'}}> Day</th>
            <th style={{ width:'30px'}}>Tim..</th>
            <th>name</th>
                          
                    {sortedDates.map((date, index) => (
                    <th key={index} style={{ width:'10px',      writingMode: 'vertical-rl', textorientation: 'mixed'}}> 
                    <span >{date}</span></th>
                    ))}                 
            </tr>
            </thead>
            <tbody>
          {sortedUniqueNames.map((name, nameIndex) => (
            <tr key={nameIndex}>
              <td style={{display:'none'}}>
                {uniqueUserID
                  .filter((userId) => calenderlist.some((item) => item.Name === name && item.UserID === userId))
                  .map((userId, userIdIndex) => (
                    <span key={userIdIndex}>{userId}</span>
                  
                  ))}
              </td>

              <td>
                
        



              {uniqueUserID.map((userId, userIdIndex) => {
    const userItem = calenderlist.find((item) => item.Name === name && item.UserID === userId);
    return (
      <span key={userIdIndex}>
   <span className="full-name">{userItem && userItem.ClassLocation}</span>

        <span className="small-screen">
        {userItem && userItem.ClassLocation.substring(0, 4)} 
        </span>
     
      </span>
    );
  })}
                </td>
              
              <td>
              {uniqueUserID.map((userId, userIdIndex) => {
    const userItem = calenderlist.find((item) => item.Name === name && item.UserID === userId);
    return (
        <span key={userIdIndex}>
             <span className="full-name">
        {userItem && userItem.ClassDay && userItem.ClassDay} 
        </span>
              <span className="small-screen">
        {userItem && userItem.ClassDay.substring(0, 3) && userItem.ClassDay.substring(0, 4)} 
        </span>
      </span>
    );
  })}  
              </td>



              <td>
              {uniqueUserID.map((userId, userIdIndex) => {
    const userItem = calenderlist.find((item) => item.Name === name && item.UserID === userId);
    return (
      <span key={userIdIndex}>
        {userItem && userItem.ClassTime} {/* Access ClassLocation property if userItem exists */}
      </span>
    );
  })}
              </td>
              <td >
              <span className="full-name">{name}</span>
      <span className="small-screen">{name.substring(0, 4)}</span>
    </td>       
         
       
              {sortedDates.map((date, dateIndex) => (
        <td key={dateIndex}>
          {uniqueUserID.map((userId, userIdIndex) => {
            const status = calenderlist.find((item) => item.Name === name && item.UserID === userId && item.Date.split('T')[0] === date)?.Status;
            return  <span key={userIdIndex} style={getStatusColor(status)}>{status}</span>;
          })}
        </td>
      ))}
            
           
            </tr>
          ))}
        </tbody>
            </table>

    </div>

   
  )
}

export default Tablelist
