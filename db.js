//Add mongoose and set DB
const Mongoose = require("mongoose");

const connString = `mongodb+srv://zkarlik:SLbRvvymtTFuh65F@cluster0.d7rsfto.mongodb.net/?retryWrites=true&w=majority`;
//const connString = `mongodb://localhost:27017/role_auth`;
const connectDB = async () => {
  await Mongoose.connect(connString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
};
module.exports = connectDB;
