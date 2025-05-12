const mongoose = require('mongoose')
require ('dotenv').config()

const connectDb = async () =>{
  try{
    await mongoose.connect(process.env.URL)
    console.log('Conectado a mongo');
  }catch(error){
    console.log('ERROR'+error);
  }
}

module.exports = connectDb