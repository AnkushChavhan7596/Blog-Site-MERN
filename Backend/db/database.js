
const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect( MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("DB Connected Successfully !!");
})
.catch((error)=>{
    console.log(error);
});

module.exports = mongoose;