const express = require("express");
const router = express.Router();
const {getAllUsers} = require("../controllers/admin.controller");

router.get("/", getAllUsers);



module.exports = router;