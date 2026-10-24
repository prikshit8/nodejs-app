const express = require("express");
const router = express.Router();

const {
  handleGetAllUsers,
  handleCreateUser,
  getUserById,
  handleUpdateUserById,
  handleDeleteUserById,
} = require("../controllers/users");

router.route("/").get(handleGetAllUsers).post(handleCreateUser);

router
  .route("/:id")
  .get(getUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
