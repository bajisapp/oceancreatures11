import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UpdateUser from './UpdateUser'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Modal, Button , Form, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker'; // Import DatePicker component


function Attendance() {

    const navigate = useNavigate()

        const [result, setUsers] = useState([])
        const [showModal, setShowModal] = useState(false);
        const [selectedUsers, setSelectedUsers] = useState([]);
        const [selectedDate, setSelectedDate] = useState(new Date());
        const [startDate, setStartDate] = useState('');
        const [selectedTime, setSelectedTime] = useState('');
        const [reason, setreason] =  useState('');
 

   useEffect(() => {
      axios.get('http://localhost:3002/getActiveStudents')
      .then(result => setUsers(result.data))
      .catch(err => console.log(err))
   }, [])

   const handleCheckboxChange = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
 // Check if startDate or selectedTime is empty
 if (!startDate || !selectedTime) {
  // Handle validation error, for example, display an error message
  alert('Please fill in both date and time fields');
  return;
 }
  console.log(selectedDate);
    const requestData = selectedUsers.map((userId) => {
      const user = result.find((u) => u._id === userId); // Find the user object by _id
      return {
        UserID: userId, // Use the userId from the selectedUsers array
        Name: user ? user.StudentFullName : '', // Access StudentFullName from found user object
        Date: startDate,
        ClassTime: selectedTime,
        ClassDuration: user ? user.ClassDuration : '', 
        Status: 'none',
        Remarks: 'N/A'// Access ClassDuration from found user object
      };
    });
  
    console.log(requestData);
    axios
      .post('http://localhost:3002/createUsersSchedulerlist', requestData)
      .then((result) => {
        console.log(result);
        alert('Successfully Submitted');
        navigate('/schedulerList');
      })
      .catch((error) => {
        console.error('Error creating scheduler list:', error);
      });
  };




  return (
    <div className='w-80'>
      <div className='row'>
        <div className='col-2'></div>
        <div className='col-8'>
    <h6>Active Student List</h6>
    <div>
    <button type="button" className="btn btn-sm btn-primary" onClick={handleShowModal}>
        Create Scheduler
      </button>
      </div>
    <table className='table'>
      <thead className='table-dark'>
          <tr>
          <th>Select</th>
              <th>Full Name</th>
              <th>Used Name</th>             
              <th>Location</th>
              <th>Day</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Age </th>
              <th>Standard</th>
              <th>Status</th>
              <th>End Date</th>
          </tr>
      </thead>
      <tbody>
{
    result.map(user => {
    return      <tr key={user._id}>
           <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleCheckboxChange(user._id)}
                />
              </td>
      <td>{user.StudentFullName}</td>
      <td>{user.UsedName}</td>
      <td>{user.ClassLocation}</td>
      <td>{user.ClassDay}</td>
      <td>{user.ClassTime}</td>
      <td>{user.ClassDuration}</td>
      <td>{user.Age}</td>
      <td>{user.Standard}</td>
      <td>{user.Status}</td>
     <td>{user.EndDate}</td>
    </tr>
  })
}
      </tbody>

    </table>
    </div>
    <div className='col-2'></div>
    </div>
    <Modal show={showModal} onHide={handleCloseModal} style={{fontSize:'13px'}}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontSize:'18px'}}>Select Date & Time </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{display:"none"}} >
            Selected User IDs: {selectedUsers.join(', ')}
          </p>
       {/*   <p>
            Selected Students: {result
              .filter(user => selectedUsers.includes(user._id))
              .map(user => user.StudentFullName)
              .join(', ')}
            </p> */}

<p>
  Student Name : {result
    .filter(user => selectedUsers.includes(user._id))
    .map((user, index) => (
      <span
        key={user._id}
        style={{
          backgroundColor: "#9c27b0", borderRadius:'6px', color:'#fff', fontSize:'12px',
          marginRight: index !== selectedUsers.length - 1 ? '5px' : '0', // Add margin-right except for the last element
          padding: '3px',
        }}
      >
        {user.StudentFullName}
      </span>
    ))}
</p>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="selectedDate">
              <Form.Label>Select a Date</Form.Label>
              <Form.Control style={{fontSize:'13px'}}
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="selectedTime">
        <Form.Label>Select a Time</Form.Label>
        <Form.Control style={{fontSize:'13px'}}
          type="time"
          value={selectedTime}
          onChange={handleTimeChange}
        />
      </Form.Group>
            <Button variant="primary" className='btn btn-sm btn-dark'  style={{marginTop:'15px'}} type="submit">
              Submit
            </Button>
          </Form>
          <p style={{display:"none"}} >
            Selected User Names: {result
              .filter(user => selectedUsers.includes(user._id))
              .map(user => user.ClassDuration)
              .join(', ')}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal} >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

  
  </div>





      
  
  )
}

export default Attendance
