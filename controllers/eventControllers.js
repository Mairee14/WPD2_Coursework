const Event = require("../models/eventModels");

 
const createEvent = (req, res) => {
  if(!req.isAuthenticated()){
    return res.redirect('/form/login');
  }
    const eventData = req.body;
    const userId = req.user._id;
    Event.create({ ...eventData, userId})
        .then((event) => {
         res.redirect('/alumni-events');
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
            // console.log(events);
            
            res.render("events", { eventData: events,});
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error getting data; please try again");
        });
};

const getMyEvents = async (req, res) => {
  try {
    if(!req.isAuthenticated()){
      return res.redirect('/form/login');
    }
    const userId = req.user._id; // Assuming you have userId available in the request
    const userEvents = await Event.find({ userId });
    console.log(req.isAuthenticated());
    console.log (req.user);
    // Render the events on a Mustache file named 'alumni-events'
    res.render('events', { eventData: userEvents, userId: userId});
  } catch (error) {
    console.error('Error fetching user events:', error);
    res.status(500).send('Error fetching user events');
  }
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




module.exports = { createEvent, getAllEvent, updateEvent, deleteEvent,getMyEvents};