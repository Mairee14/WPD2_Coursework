const express = require("express");
const router = express.Router();
const { createUser, editUser, deleteUser, logout } = require("../../controllers/userControllers");



router.post("/", createUser);


router.put('/user/:id', editUser);
router.delete('/user/:id', deleteUser);



  
  // POST route for handling logout
  router.post('/logout', logout)


module.exports = router;

