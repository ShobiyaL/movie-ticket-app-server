const express = require('express')
const cors = require('cors')

const app = express();


const publicRoute = require('./routes/public');
const adminRoute = require('./routes/admin');
const AuthCheck = require("./middlewares/AuthCheck");
const AdminCheck = require("./middlewares/AdminCheck");

app.use(cors());
app.use(express.json());

app.use('/api/public',publicRoute);
app.use('/api/admin',AuthCheck,AdminCheck,adminRoute);

// test api
app.get("/api/test", (req, res) => {
    res.json({message:"All works fine-- start"});
})

module.exports =app;