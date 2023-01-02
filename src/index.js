require('dotenv').config();

const app = require('./app');
const { dbConnect } = require('./config/database');

const port = process.env.PORT || 8080;

dbConnect();
app.listen(port,()=>{
   console.log(`Server is running on port: ${port}`)
});