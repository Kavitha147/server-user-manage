const mongoose = require("mongoose");

const dbData = new mongoose.Schema({
    email: { type: 'string', },
    name: { type: 'string' },
    description: { type: 'string' },
    disable: {type: 'boolean'}
});

module.exports = mongoose.model("writeupdata", dbData);
