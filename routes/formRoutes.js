const express = require('express');
const router = express.Router();
const path = require("path");
const bodyParser = require('body-parser'); // Require body-parser

// const { login } = require("../controllers/userControllers");

// Use body-parser middleware
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "pages", "signup.html"));
});

router.get("/login", (req, res) => {
    res.render('login'); // Renders the login.mustache file
});


router.get("/logout", (req, res) => {
    res.render('logout'); // Renders the login.mustache file
});
// router.post('/login', login);

module.exports = router;
