const express = require("express");

const { connectMongoDB } = require('./connection');
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");

const app = express();
const PORT = 3300;

connectMongoDB("mongodb://127.0.0.1:27017/users-db")
  .then(() => console.log("mongo db connected"))
  .catch((err) => console.log("Mongo db error", err));

// middleware 1
app.use(express.urlencoded({ extended: true }));

app.use(logReqRes("log.txt"));

// user.filter(user=>user.age >= 18); [];
app.use("/users", userRouter);

app.listen(PORT, () => console.log("server is up and running on " + PORT));
