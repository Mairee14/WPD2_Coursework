const Event = require("../models/eventModels");

const createEvent = (req, res) => {
    const eventData = req.body;
    Event.create(eventData)
        .then((event) => {
          res.status(200).send({ message: "Event created successfully" });
        })
        .catch((err) => {
            console.error("an error occurred");
            console.error(err);
            res.status(500).send("Error creating event! please try again");
        });
};

const getAllEvent = (req, res) => {
    Event.find({})
        .then((events) => {
            console.log(events);
            res.render("events", { eventData: events });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error getting data; please try again");
        });
};

const updateEvent = (req, res) => {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "Data to update cannot be empty" });
    }
  
    const eventId = req.params.id; // Assuming req.params.id contains the ID.
  
    Event.findOneAndUpdate({ _id: eventId }, req.body, { new: true })
      .then((event) => {
        if (!event) {
          return res.status(404).send({
            message: `Cannot update event with ID ${eventId}. Event not found!`,
          });
        } else {
          console.log("Updated event:", event);
          res.status(200).send({ message: "Event updated successfully" });
        }
      })
      .catch((error) => {
        console.error("An error occurred");
        console.error({ error });
        res.status(500).send({ message: "Error updating event" });
      });
  };

  const deleteEvent = (req, res) => {
    const eventId = req.params.id; // Assuming req.params.id contains the ID.
  
    Event.findOneAndDelete({ _id: eventId })
      .then((event) => {
        if (!event) {
          return res.status(404).send({
            message: `Cannot delete event with ID ${eventId}. Event not found!`,
          });
        } else {
          console.log("Deleted event:", event);
          res.status(200).send({ message: "Event deleted successfully" });
        }
      })
      .catch((error) => {
        console.error("An error occurred");
        console.error({ error });
        res.status(500).send({ message: "Error deleting event" });
      });
  };




module.exports = { createEvent, getAllEvent, updateEvent, deleteEvent};