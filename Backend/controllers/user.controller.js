const usermodel = require('../models/user.model');
const userservices = require('../services/user.services');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');



module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name: { firstname, lastname }, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userservices.createUser({
        firstname, 
        lastname,
        email, 
        password: hashedPassword });
    
    const token = user.generateAuthToken();

    res.status(201).json({ user, token });

};

     