const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "pages", "event.html"));
});

router.get("/event", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "pages", "eventPage.html"));
});


router.get("/campusEvent", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "pages", "campusEvent.html"));
});

router.get("/professional", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "pages", "professionalEvent.html"));
});

router.get("/networking", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "pages", "networkingEvent.html"));
});


module.exports = router;