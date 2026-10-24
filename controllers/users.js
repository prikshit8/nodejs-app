const User = require("../models/users");

async function handleGetAllUsers(req, res) {
  try {
    const allUsers = await User.find({});
    return res.json(allUsers);
  } catch (err) {
    console.log("error while getting users", err);
    return res.json(err);
  }
}

async function handleCreateUser(req, res) {
  const body = req.body;
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
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.json({ msg: "user not found" });
  return res.status(200).json(user);
}

async function handleUpdateUserById(req, res) {
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
    if (!user) {
      return res.json({ msg: "user not found" });
    }
    return res.json(user);
  } catch (err) {}
}

async function handleDeleteUserById(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.json({ msg: "no user found" });
    }
    return res.json({ msg: "user deleted", user });
  } catch (err) {}
}

module.exports = {
  handleGetAllUsers,
  handleCreateUser,
  getUserById,
  handleUpdateUserById,
  handleDeleteUserById,
};
