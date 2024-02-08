import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UpdateUser from './UpdateUser'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import 'react-calendar/dist/Calendar.css';

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';




function Table() {

    const navigate = useNavigate()

    const [calenderlist, setcalenderlist] = useState([])

    const localizer = momentLocalizer(moment)

   useEffect(() => {
      axios.get('http://localhost:3002/getUserslist')
      .then(calenderlist => setcalenderlist(calenderlist.data))
      .catch(err => console.log(err))
   }, [])


  return (
    <div>
     <table className='table'>
        <thead className='table-dark'>
            <tr>
                <th style={{display:'none'}}>UserID</th>
                <th>Name</th>
                <th>Date</th>
                <th>ClassTime</th>
                <th>ClassDuration</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Remarks</th>
                <th></th>

            </tr>
        </thead>
        <tbody>
{
      calenderlist.map(listb => {

        const dateString = listb.Date; // Assuming listb.Date is in the format '2024-01-06'
        const dateObject = new Date(dateString);

        // Format the date to display in the table (without time)
        const formattedDate = dateObject.toISOString().split('T')[0]; // Extract only the date part 
        const getStatusColor = (status) => {
            let backgroundColor, textColor, padding, borderRadius; // Declare padding variable
            
            if (status === 'present') {
              backgroundColor = 'green';
              textColor = 'white'; // Change the text color for "present"
              padding = '5px';
              borderRadius = '6px';
              
            } else if (status === 'absent') {
              backgroundColor = 'orange';
              textColor = 'black'; // Change the text color for "absent"
              padding = '5px';
              borderRadius = '6px';
            } else {
              backgroundColor = '#ddd';
              textColor = 'black';
              padding = '5px'; // Change the default text color
              borderRadius = '6px';
            }
            
            return { backgroundColor, color: textColor, padding, borderRadius };
          };
     // const formattedDate = moment(item.Date).format('YYYY-MM-DD HH:mm:ss');        
      
      return  <tr>
        <td  style={{display:'none'}}>{listb.UserID}</td>
        <td>{listb.Name}</td>
       {/*  <td>{new Date(listb.Date).toLocaleDateString()}</td> */}
        <td> {listb.Date.split('T')[0]} </td>
        <td>{listb.ClassTime}:00</td>
        <td>{listb.ClassDuration}</td>
        <td>{formattedDate}T{listb.ClassTime}:00</td>
        <td><span style={getStatusColor(listb.Status)}>{listb.Status}</span></td>
        <td>{listb.Remarks}</td>
        <td>  
           <Link className="btn btn-dark btn-sm" style={{display:'none'}}> Edit</Link>
        <button className='btn btn-sm btn-danger'  style={{display:'none'}} >Delete</button> 
        </td>
        </tr>
    })
}
        </tbody>

      </table>


  </div>

   
  )
}

export default Table
