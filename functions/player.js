const playerModel = require('../models/player');
const bcrypt = require('bcrypt');


const signUp = async (req) => {
    let newPlayer = new playerModel(req.body);
    let hash = await bcrypt.hash(req.body.password, 10);
    newPlayer.password = hash;
    let result = await newPlayer.save();
    return result;
}

const getPlayer = async (req) => {
    let player = await playerModel.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    return player;
}

const editProfile = async (req) => {
    const { foot, position, country, firstName, lastName } = req.body;
    let player = await playerModel.findOneAndUpdate({ username: req.user.username },
        { $set: { foot: foot, position: position, country: country, firstName: firstName, lastName: lastName } });
    return player;
}

module.exports = { signUp, getPlayer, editProfile }

