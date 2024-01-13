const mongoose = require('mongoose');

const Datelist = new mongoose.Schema({

    "Name":  String,
    
   

});

const UserModelji = mongoose.model("schedulerlist", Datelist);
module.exports = UserModelji;