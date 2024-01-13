import React, { useEffect, useState } from 'react'
import axios from 'axios'
import UpdateUser from './UpdateUser'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';




function Home() {

    const navigate = useNavigate()

    const [result, setUsers] = useState([])

    useEffect(() => {
      axios.get('http://localhost:3002/getUsers')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => console.error(error));
    }, []);
  


   const handleDelete = (id) => {
    axios.delete('http://localhost:3002/deleteUser/'+id)
    .then(res => {console.log(res)
       window.location.reload()})
    .catch(errr => console.log(errr))
   }
   const columns = [
    {
      name: 'Edit',
      cell: (row) => (
        <Link to={`/update/${row._id}`} className="btn btn-dark btn-sm">
          Edit
        </Link>
      ),
    },
      {
        name: 'StudentFullName',
      selector: 'StudentFullName',
      },
      {
        name: 'UsedName',
      selector: 'UsedName',
    },
      {
        name: 'Mother',
      selector: 'Mother',
    },
      {
        name: 'Father',
      selector: 'Father',
    },
      {
        name: 'ClassLocation',
      selector: 'ClassLocation',
    },
      {
        name:  'ClassDay',
      selector: 'ClassDay',
    },
      {
        name: 'ClassTime',
      selector: 'ClassTime',
    },
      {
        name: 'ClassDuration',
      selector: 'ClassDuration',
    },
      {
        name: 'Age',
      selector: 'Age',
    },
      {
        name: 'Standard',
      selector: 'Standard',
    },
      {
        name: 'Status',
      selector: 'Status',
    },
      {
        name: 'EndDate',
      selector: 'EndDate',
    },
      {
        name: 'CertificationAttained',
      selector: 'CertificationAttained',
    },
      {
        name: 'Birthdate',
      selector: 'Birthdate',
    },
      {
        name: 'BirthYear',
      selector: 'BirthYear',
    },
      {
        name: 'NRIC',
      selector: 'NRIC',
    }
      
    ];

    const customSearch = (searchQuery, currentRow, columnIndex) => {
      // Implement your custom search logic here
      const rowValue = currentRow[columnIndex].toLowerCase();
      return rowValue.includes(searchQuery.toLowerCase());
    };
    const [busers, setbUsers] = useState([
        {
'StudentFullName' : "Kelly",
'UsedName' : "Kelly",
'Mother' :"-",
'Father': "-",
'ClassLocation':"Oasis Garden",
'ClassDay':"Saturday",
'ClassTime':"09:45",
'ClassDuration':"30mins",
Age: 3,
Standard:"Water Confidence",
Status:"Ended",
"EndDate": "30/02/18",
"CertificationAttained":"-",
Birthdate:"-",
"BirthYear":"-",
NRIC:"-"
        }
    ])
  return (
    <div className='w-80'>
      <div style={{padding:'20px'}}>
      <h6>Student List</h6>
      <DataTable
      columns={columns}
      data={result}
      searching
      pagination
      highlightOnHover
      striped
      customSearch={customSearch}
    />
      <table className='table' id='dataTable' style={{display:'none'}}> 
        <thead className='table-dark'>
            <tr>
                <th>Full Name</th>
                <th>Used Name</th>
                <th>Mother</th>
                <th>Father</th>
                <th>Location</th>
                <th>Day</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Age </th>
                <th>Standard</th>
                <th>Status</th>
                <th>End Date</th>
                <th>D.O.B</th>
                <th>NRIC</th>
                <th> - </th>
            </tr>
        </thead>
        <tbody>
{
      result.map(user => {
      return  <tr>
        <td>{user.StudentFullName}</td>
        <td>{user.UsedName}</td>
        <td>{user.Mother}</td>
        <td>{user.Father}</td>
        <td>{user.ClassLocation}</td>
        <td>{user.ClassDay}</td>
        <td>{user.ClassTime}</td>
        <td>{user.ClassDuration}</td>
        <td>{user.Age}</td>
        <td>{user.Standard}</td>
        <td>{user.Status}</td>
        <td>{user.EndDate}</td>
       <td>{user.Birthdate}</td>
       <td>{user.NRIC}</td>
       <td>  
           <Link className="btn btn-dark btn-sm" to={`/update/${user._id}`} classNameName='link'> Edit</Link>
        <button className='btn btn-sm btn-danger' onClick={(e) => handleDelete(user._id)} style={{display:'none'}} >Delete</button> </td>
        </tr>
    })
}
        </tbody>

      </table>

   
    </div>
    </div>
  )
}

export default Home
