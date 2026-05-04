const captainmodel = require("../models/captain.model");    
const captainservice = require("../services/captain.service");
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


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