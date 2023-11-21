const express = require("express");
const router = express.Router();
const path = require("path");
const { createUser,getAllUsers } = require("../../controllers/userControllers");



router.post("/", createUser);

router.get("/", getAllUsers);



module.exports = router;