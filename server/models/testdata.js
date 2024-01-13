const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
 
    "StudentFullName": String,

    "UsedName": String,

    "Mother": String,

    "Father": String,

    "ClassLocation": String,

    "ClassDay": String,

    "ClassTime": String,

    "ClassDuration": String,

Age: Number,

"Standard": String,

"Status": String,

"EndDate": String,

"CertificationAttained": String,

"Birthdate": String,

"BirthYear": String,

"NRIC": String,

})

const Modelst = mongoose.model("testdata", UserSchema)
module.exports = Modelst