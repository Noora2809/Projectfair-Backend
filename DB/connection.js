//node + mongodb conection

const mongoose = require('mongoose')

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("Mongodb connection extablished");
})
.catch(err => {
    console.log("Mongodb connection error" +err.message);
})