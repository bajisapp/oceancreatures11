import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateUser() {

 const navigate = useNavigate()

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


 const Submit = (e) => {
    console.log('hello')
    e.preventDefault();
    axios.post('http://localhost:3002/createUsers', {StudentFullName, UsedName,  Mother, Father, ClassLocation, ClassDay, ClassTime, ClassDuration, Age, Standard,Status ,EndDate, CertificationAttained, Birthdate, BirthYear, NRIC})
    .then(result => {
        console.log(result)
        alert('Successfully regiser')
        navigate('/')
    })
    .catch(err => console.log(err),       alert('error') ,navigate('/create'))
 }
 

  return (
    <div>
   
   {/*    'Student Full Name' : "Kelly",

'Used Name' : "Kelly",
'Mother' :"-",
'Father': "-",
'Class Location':"Oasis Garden",
'Class Day':"Saturday",
'Class Time':"09:45",
'Class Duration':"30mins",
Age: 3,
Standard:"Water Confidence",
Status:"Ended",
"End Date": "30/02/18",
"Certification Attained":"-",
Birthdate:"-",
"Birth Year":"-",
NRIC:"-"*/}
<form onSubmit={Submit}>
<div class="row">
    <div class="col-1">
        </div>
        <div class="col-10">
    <h6 >Create New Student</h6>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Student Name</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setStudentFullName(e.target.value)} />
    </div>
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Used Name</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setUsedName(e.target.value)} />
    </div>
    </div>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Mother</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setMother(e.target.value)} />
    </div>
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Father</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setFather(e.target.value)} />
    </div>
    </div>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Class Location</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setClassLocation(e.target.value)} />
    </div>
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Class Day</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setClassDay(e.target.value)} />
    </div>
    </div>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Class Time</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setClassTime(e.target.value)} />
    </div>
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Class Duration</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setClassDuration(e.target.value)} />
    </div>
    </div>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Age</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setAge(e.target.value)} />
   </div>
   <div class="col">
   <label for="exampleInputPassword1" class="form-label"> Standard</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setStandard(e.target.value)} />
    </div>
    </div>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Status</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setStatus(e.target.value)} />
    </div>
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> End Date</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setEndDate(e.target.value)} />
    </div>
    </div>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Certification Attained</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setCertificationAttained(e.target.value)} />
</div>
<div class="col">
<label for="exampleInputPassword1" class="form-label"> Birth Date</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setBirthdate(e.target.value)} />
    </div>
    </div>
    <div class="row">
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> Birth Year</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setBirthYear(e.target.value)} />

    </div>
    <div class="col">
    <label for="exampleInputPassword1" class="form-label"> NRIC</label>
    <input type='text' placeholder='' className='form-control' onChange={(e) => setNRIC(e.target.value)} />
    </div>
    </div>    
    <button className='btn btn-dark btn-sm'>Submit</button>
    </div>
    <div class="col-1">
        </div>
    </div>

  
</form>
    </div>
  )
}

export default CreateUser
