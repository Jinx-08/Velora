const captainmodel = require("../models/captain.model");    
const captainservice = require("../services/captain.service");
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/blacklisttoken.model');


module.exports.registerCaptain = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { name: { firstname, lastname }, email, password, vehicles: { color, plate, capacity, vehicletype } } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const isCaptainExist = await captainmodel.findOne({ email });
    if (isCaptainExist) {
        return res.status(400).json({ error: 'Captain already exists' });
    }
    

    const captain = await captainservice.createCaptain({
        firstname, 
        lastname,   
        email,
        password: hashedPassword,
        color,
        plate,
        capacity,
        vehicletype
    });
    const token = captain.generateAuthToken();
    res.status(201).json({ captain, token }); 

}

module.exports.loginCaptain = async (req, res, next) => { 
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { email, password } = req.body;
    const captain = await captainmodel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, captain.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token' , token);
    res.json({ captain, token });
}

module.exports.getProfile = async (req, res, next) => {
   res.status(200).json({ captain: req.captain });  
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    await blacklistTokenModel.create({ token });

    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
}