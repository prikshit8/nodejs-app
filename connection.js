const mongoose = require("mongoose");

// mongoose
//   .connect("mongodb://127.0.0.1:27017/users-db")
//   .then(() => console.log("mongo db connected"))
//   .catch((err) => console.log("Mongo db error", err));

async function connectMongoDB(url) {
  return mongoose.connect(url);
}

module.exports = {
  connectMongoDB,
};
