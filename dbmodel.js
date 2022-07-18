const mongoose = require("mongoose");

const dbData = new mongoose.Schema({
    userName: { type: 'string' },
    email: { type: 'string', unique: true },
    password: { type: 'string' },
    isAdmin: { type: 'boolean' }
});

module.exports = mongoose.model("dbData", dbData);
