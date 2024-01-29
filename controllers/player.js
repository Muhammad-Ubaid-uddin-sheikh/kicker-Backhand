
const playerFunctions = require('../functions/player');
const response = require('../helpers/response');
const validationFunctions = require('../functions/validations');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config;


const signUp = async (req, res) => {
    try {
        console.log('siggning user up');
        if (await validationFunctions.validateEmailUsername(req)) return response.resBadRequest(res, "username or email already exists");
        await playerFunctions.signUp(req);
        return response.resSuccessData(res, 'success');
    }
    catch (error) {
        console.log(error);
        return response.resInternalError(res, error);
    }
}

const logIn = async (req, res) => {
    try {
        if (!await validationFunctions.validateEmailUsername(req)) return response.resBadRequest(res, "couldn't find user");
        let player = await playerFunctions.getPlayer(req);
        if (! await validationFunctions.verifyPassword(req.body.password, player.password)) return response.resAuthenticate(res, "one or more details are incorrect");
        let token = jwt.sign({
            id: player.id,
            email: player.email,
            username: player.username
        }, process.env.tokenpw)
        return response.resSuccessData(res, token);
    }
    catch (error) {
        console.log(error);
        return response.resInternalError(res, error);
    }
}

const editProfile = async (req, res) => {
    try {
        let player = await playerFunctions.editProfile(req);
        return response.resSuccessData(res, "updated");
    }
    catch (error) {
        console.log(error);
        return response.resInternalError(res, error);
    }
}


module.exports = { signUp, logIn, editProfile }