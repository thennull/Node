const mongoose = require('mongoose');

var connectDB = async function (){
  let conn = await mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`Mongo connected: ${conn.connection.host}`);
}

module.exports = connectDB;
