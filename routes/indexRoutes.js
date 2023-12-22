const express = require('express')
const router = express.Router()
const path = require("path");


router.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public", "pages", "index.html"));
});



module.exports = router;