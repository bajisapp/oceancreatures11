const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
const EmployeeModel = require('./models/Employee')


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://kandhanmart:AEX25G6iPvjG8B54@cluster0.zpo56jy.mongodb.net/mernbajidb")

app.get('/getUsers', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

app.get('/getUserslist', (req, res) => {
    EmployeeModel.find()
    .then(employee => res.json(employee))
    .catch(err => res.json(err))
});




app.post('/createUsers', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.get('/getActiveStudents', (req, res) => {
    UserModel.find({Status : 'Current Student' })
    .then(users => res.json(users))
    .catch(err => res.json(err))
  });


app.get('/getUsers/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.post('/createUsersSchedulerlist', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employee => res.json(employee))
    .catch(err => res.json(err))
})


app.put('/updateattendance/:id', (req, res) => {
    const id = req.params.id;
    console.log('id', id);
    console.log('status', req.body.Status);
    console.log('remarks', req.body.Remarks);
    EmployeeModel.findByIdAndUpdate(
        id, 
        {
            Status: req.body.Status,
            Remarks: req.body.Remarks
        },
        { new: true } // Return the updated document
    )
    .then(employee => res.json(employee))
    .catch(err => res.json(err))
});

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {

        StudentFullName: req.body.StudentFullName,

        UsedName: req.body.UsedName,
    
        Mother: req.body.Mother,
    
        Father: req.body.Father,
    
        ClassLocation: req.body.ClassLocation,
    
        ClassDay: req.body.ClassDay,
    
        ClassTime: req.body.ClassTime,
    
        ClassDuration: req.body.ClassDuration,
    
     Age: req.body.Age,
    
    Standard: req.body.Standard,
    
    Status: req.body.Status,
    
    EndDate: req.body.EndDate,
    
    CertificationAttained: req.body.CertificationAttained,
    
    Birthdate: req.body.Birthdate,
    
    BirthYear: req.body.BirthYear,
    
    NRIC: req.body.NRIC

    })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})



app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))

})

app.listen(3002, () => {
    console.log('Serve is running')
})