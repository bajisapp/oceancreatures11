const mongoose = require('mongoose');

const UserSchemaf = new mongoose.Schema({
    "UserID": String,
    "Name": String,
    "Date": String,
    "ClassTime": String,
    "ClassDuration": String
});

const UserModels = mongoose.model("schedulerlist", UserSchemaf);
module.exports = UserModels;