const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 3300;

mongoose
  .connect("mongodb://127.0.0.1:27017/users-db")
  .then(() => console.log("mongo db connected"))
  .catch((err) => console.log("Mongo db error", err));

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

const User = mongoose.model("user", userSchema);

// middleware 1
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  fs.appendFile("log.txt", `${Date.now()} : ${req.method} \n`, (err, data) => {
    next();
  });
});

// user.filter(user=>user.age >= 18); [];

app
  .route("/users")
  .get(async (req, res) => {
    // res.setHeader("X-topic", "middleware");
    // return res.json(users);
    try {
      const allUsers = await User.find({});
      return res.json(allUsers);
    } catch (err) {
      console.log("error while getting users", err);
      return res.json(err);
    }
  })
  .post(async (req, res) => {
    const body = req.body;
    // first_name
    // last_name
    // email

    try {
      const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
      });
      return res.status(201).json(result);
    } catch (err) {
      console.log("error while creating user", err);
      return res.json(err);
    }

    // users.push({ ...body, id: users.length + 1 });
    // fs.writeFile("./DB.json", JSON.stringify(users), (err, data) => {
    //   return res.json({ status: `user created with userId: ${users.length}` });
    // });
  });

app.get("/users/:id", async (req, res) => {
  // try{
  const user = await User.findById(req.params.id);
  // mongo -> you don't have to handle this case.
  // if(!user) return res.json({msg:"user not found"});
  return res.status(200).json(user);
  // }
  // catch(err){
  //   console.log(err);
  //   return res.json(err);
  // }
  // const id = Number(req.params.id);
  // // console.log(typeof id);
  // // console.log(typeof users[0].id);
  // const user = users.find((user) => user.id === id);
  // return res.json(user);
});

app.patch("/users/:id", async (req, res) => {
  const updatedUser = {};
  try {
    if (req.body.first_name !== undefined) {
      updatedUser.firstName = req.body.first_name;
    }
    if (req.body.last_name !== undefined) {
      updatedUser.lastName = req.body.last_name;
    }
    if (req.body.email !== undefined) {
      updatedUser.email = req.body.email;
    }
    const user = await User.findByIdAndUpdate(req.params.id, updatedUser, {
      new: true,
      runValidators: true,
    });
    if(!user){
      return res.json({msg:"user not found"});
    }
    return res.json(user);
  } catch (err) {}
});

app.delete("/users/:id",async(req,res)=>{
  try{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user){
      return res.json({msg:"no user found"});
    }
    return res.json({msg:"user deleted",user});
  }
  catch(err){

  }
})

app.listen(PORT, () => console.log("server is up and running on " + PORT));
