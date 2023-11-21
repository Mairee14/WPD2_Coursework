const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/event", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "pages", "event.html"));
});



module.exports = router;