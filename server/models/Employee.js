const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
 
    "UserID": String,

    "Name": String,

    "Date": Date,

    "ClassTime": String,

    "ClassDuration": String,

    "Status" : String,
    
    "Remarks" : String,

    "ClassLocation" : String,

    "ClassDay": String

})

const EmployeeModel = mongoose.model("employees", EmployeeSchema)
module.exports = EmployeeModel


