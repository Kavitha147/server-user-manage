const mongoose = require("mongoose");

const dbData = new mongoose.Schema({
    email: { type: 'string', unique: true, value: 'admin@gmail.com' },
    password: { type: 'string' , value:'admin@123'},
    
});

module.exports = mongoose.model("admindata", dbData);
