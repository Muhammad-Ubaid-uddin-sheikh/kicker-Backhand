const playerModel = require('../models/player');
const bcrypt = require('bcrypt');

const validateEmailUsername = async (req) => {
    console.log(req.body.username, req.body.email);
    let existing = await playerModel.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (existing) return true;
    return false;
}

const verifyPassword = async (password, hash) => {
    let match = await bcrypt.compare(password, hash);
    console.log('match testing', match);
    return match;
}

module.exports = { validateEmailUsername, verifyPassword }