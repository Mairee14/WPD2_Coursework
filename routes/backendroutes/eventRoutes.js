const express = require("express");
const router = express.Router();
const path = require("path");
const { createEvent,getMyEvents, updateEvent, deleteEvent } = require("../../controllers/eventControllers");

router.post("/", createEvent);
router.get("/", getMyEvents);

// Route for editing an event
router.post('/:id', updateEvent);
router.post("/delete/:id", deleteEvent);

module.exports = router;