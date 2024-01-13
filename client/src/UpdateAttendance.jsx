import React from 'react'
import { useParams } from 'react-router-dom'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Alert from "react-bootstrap/Alert"; 

function UpdateAttendance() {

    const [showAlert, setShowAlert] = useState(false);

    const navigate = useNavigate()
  
    const {id} = useParams()
  
    const [StudentFullName, setStudentFullName] = useState()
  
    const [UsedName, setUsedName] = useState()
   
    const [Mother, setMother] = useState()
   
    const [Father, setFather] = useState()
   
    const [ClassLocation, setClassLocation] = useState()
   
    const [ClassDay, setClassDay] = useState()
   
    const [ClassTime, setClassTime] = useState()
   
    const [ClassDuration, setClassDuration] = useState()
   
    const [Age, setAge] = useState()
   
       const [Standard, setStandard] = useState()
   
       const [Status, setStatus] = useState()
   
       const [EndDate, setEndDate] = useState()
   
       const [CertificationAttained, setCertificationAttained] = useState()
   
       const [Birthdate, setBirthdate] = useState()
   
       const [BirthYear, setBirthYear] = useState()
   
       const [NRIC, setNRIC] = useState()

        

     useEffect(() => {
        axios.get('http://localhost:3002/getUserslist/'+id)
        .then(result => {console.log(result)
       setStudentFullName(result.data.StudentFullName)
  
        setUsedName(result.data.UsedName)
       
        setMother(result.data.Mother)
       
       setFather(result.data.Father)
       
        setClassLocation(result.data.ClassLocation)
       
        setClassDay(result.data.ClassDay)
       
         setClassTime(result.data.ClassTime)
       
        setClassDuration(result.data.ClassDuration)
       
       setAge(result.data.Age)
       
        setStandard(result.data.Standard)
       
         setStatus(result.data.Status)
       
         setEndDate(result.data.EndDate)
       
           setCertificationAttained(result.data.CertificationAttained)
       
          setBirthdate(result.data.Birthdate)
       
          setBirthYear(result.data.BirthYear)
       
          setNRIC(result.data.NRIC)
      
       })
        .catch(err => console.log(err))
     }, [])
  
     const Update = (e) => {
      console.log('hello')
      e.preventDefault();
      axios.put('http://localhost:3002/updateUser/'+id, {StudentFullName, UsedName,  Mother, Father, ClassLocation, ClassDay, ClassTime, ClassDuration, Age, Standard,Status ,EndDate, CertificationAttained, Birthdate, BirthYear, NRIC})
      .then(result => {
         console.log(result)
         setShowAlert(true); // Set state to show the alert
         navigate('/home')
   
      })
      .catch(err => console.log(err))
   }
  

 
   return (
    <div>
      <h2>update user</h2>
      {showAlert && (
        <Alert variant="success" style={{ width: "42rem" }}>
          <Alert.Heading>
            This is a success alert which has green background
          </Alert.Heading>
        </Alert>
      )}
<div class="row">
    <div class="col-1">
        </div>
        <div class="col-10">

<form onSubmit={Update}>

    <h6 >Create New Student</h6>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Student Name</label>
    <input type='text' placeholder='' className='form-control' value={StudentFullName} onChange={(e) => setStudentFullName(e.target.value)} />
    </div>
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Used Name</label>
    <input type='text' placeholder='' className='form-control' value={UsedName} onChange={(e) => setUsedName(e.target.value)} />
    </div>
    </div>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Mother</label>
    <input type='text' placeholder='' className='form-control' value={Mother} onChange={(e) => setMother(e.target.value)} />
    </div>
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Father</label>
    <input type='text' placeholder='' className='form-control' value={Father} onChange={(e) => setFather(e.target.value)} />
    </div>
    </div>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Class Location</label>
    <input type='text' placeholder='' className='form-control' value={ClassLocation} onChange={(e) => setClassLocation(e.target.value)} />
    </div>
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Class Day</label>
    <input type='text' placeholder='' className='form-control' value={ClassDay} onChange={(e) => setClassDay(e.target.value)} />
    </div>
    </div>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Class Time</label>
    <input type='text' placeholder='' className='form-control' value={ClassTime} onChange={(e) => setClassTime(e.target.value)} />
    </div>
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Class Duration</label>
    <input type='text' placeholder='' className='form-control' value={ClassDuration} onChange={(e) => setClassDuration(e.target.value)} />
    </div>
    </div>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Age</label>
    <input type='text' placeholder='' className='form-control' value={Age} onChange={(e) => setAge(e.target.value)} />
   </div>
   <div class="col">
   <label for="exampleInputPassword1" class="form-label"> Standard</label>
    <input type='text' placeholder='' className='form-control' value={Standard} onChange={(e) => setStandard(e.target.value)} />
    </div>
    </div>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Status</label>
    <input type='text' placeholder='' className='form-control' value={Status} onChange={(e) => setStatus(e.target.value)} />
    </div>
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> End Date</label>
    <input type='text' placeholder='' className='form-control' value={EndDate} onChange={(e) => setEndDate(e.target.value)} />
    </div>
    </div>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Certification Attained</label>
    <input type='text' placeholder='' className='form-control' value={CertificationAttained} onChange={(e) => setCertificationAttained(e.target.value)} />
</div>
<div class="col">
<label for="exampleInputPassword1" class="form-label"> Birth Date</label>
    <input type='text' placeholder='' className='form-control' value={Birthdate} onChange={(e) => setBirthdate(e.target.value)} />
    </div>
    </div>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Birth Year</label>
    <input type='text' placeholder='' className='form-control' value={BirthYear} onChange={(e) => setBirthYear(e.target.value)} />

    </div>
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> NRIC</label>
    <input type='text' placeholder='' className='form-control' value={NRIC} onChange={(e) => setNRIC(e.target.value)} />
    </div>
    </div>    
    <button className='btn btn-dark'>Submit</button>
   
    </form>
   
    </div>
    <div class="col-1">
        </div>
    </div>

  

    </div>
  )
}

export default UpdateAttendance




