const mongoose = require("mongoose");
const cors = require('cors');

const { mongo } = require('./var');

const express = require('express');
const bodyParser = require("body-parser");

const dbDataModel = require('./dbmodel');
const writeupdb = require("./writeupdb");
const admindb = require("./admindb");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(mongo.uri, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const port = 3001;

app.get('/get', async (req, res) => {
    try {
        const data = await dbDataModel.find()
        res.send({ data });
    } catch (e) {
        res.send({ error: e });
    }
});

app.post('/add', async (req, res) => {
    try {
        const { isAdmin, email, userName, password } = req.body;
        const data = await dbDataModel.insertMany([{
            isAdmin,
            email,
            userName,
            password
        }])
        res.send({ data, error: null });
    } catch (e) {
        res.send({ error: e, data: null });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await dbDataModel.find({
            email,
            password
        })
        res.send({ data, error: null });
    } catch (e) {
        res.send({ error: e, data: null });
    }
});

app.post('/add-write', async (req, res) => {
    try {
        const { name, email, description } = req.body;
        const data = await writeupdb.insertMany([{
            name, description, email, disable: false
        }])
        res.send({ data, error: null });
    } catch (e) {
        res.send({ error: e, data: null });
    }
});

app.post('/edit-write', async (req, res) => {
    try {
        const { name, description, writeupId } = req.body;
        const data = await writeupdb.updateOne({
            _id: new Object(writeupId)
        }, {
            name,
            description
        })
        res.send({ data, error: null });
    } catch (e) {
        res.send({ error: e, data: null })
    }
})

app.post('/delete-write', async (req, res) => {
    try {
        const { writeupId } = req.body;
        const data = await writeupdb.deleteOne({
            _id: new Object(writeupId)
        })
        res.send({ data, error: null });
    } catch (e) {
        res.send({ error: e, data: null })
    }
})

app.get('/get-writeup', async (req, res) => {
    try {
        const data = await writeupdb.find()
        res.send({ data });
    } catch (e) {
        res.send({ error: e });
    }
});

app.post('/get-user-writeup', async (req, res) => {
    try {
        const { email } = req.body;
        const data = await writeupdb.find({ email, disable: false });
        res.send({ data });
    } catch (e) {
        res.send({ error: e });
    }
});

app.get('/admin-login', async (req, res) => {
    try {
        const data = await admindb.find();
        res.send({ data: { email: 'admin@gmail.com', password: 'admin@123' } });
    } catch (e) {
        res.send({ error: e });
    }
});

app.post('/disable-write', async (req, res) => {
    try {
        const { writeupId, disable } = req.body;
        const data = await writeupdb.updateOne({
            _id: new Object(writeupId)
        }, {
            disable
        })
        res.send({ data, error: null });
    } catch (e) {
        res.send({ error: e, data: null })
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
