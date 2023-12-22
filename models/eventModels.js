const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventname: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum:["select category","Networking","Social","Professional Development", ""],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('Event', eventSchema);