const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alumniSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },
    // yearGroup: {
    //     type: String,
    //     enum:["select","year","group","entity"],
    //     required: true
    // },
    // location: {
    //     type: String,
    //     required: true
    // },
    role: {
        type: String,
        enum:["alumni","admin"],
        default: 'alumni'
    }

    


});




module.exports = mongoose.model('User', alumniSchema);
