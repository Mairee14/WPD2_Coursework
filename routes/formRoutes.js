const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "pages", "signup.html"));
});

// router.get("/login", (req, res) => {
//     res.sendFile(path.join(__dirname, "../public", "pages", "login.html"));
// });

module.exports = router;