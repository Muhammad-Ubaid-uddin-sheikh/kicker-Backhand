const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    playerId: {
        type: String
    },
    password: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    username: {
        type: String,
    },
    foot: {
        type: String,
    },
    position: {
        type: String,
    },
    country: {
        type: String,
    }
});
const playerModel = mongoose.model('player', playerSchema);
module.exports = playerModel;
