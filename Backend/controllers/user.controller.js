const usermodel = require('../models/user.model');
const userservices = require('../services/user.services');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/blacklisttoken.model');



module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name: { firstname, lastname }, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const isUserExist = await usermodel.findOne({ email });
    if (isUserExist) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const user = await userservices.createUser({
        firstname, 
        lastname,
        email, 
        password: hashedPassword });
    
    const token = user.generateAuthToken();

    res.status(201).json({ user, token });

};

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }       

    const { email, password } = req.body;

    const user = await usermodel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    } 

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();
    res.cookie('token' , token);

    res.json({ user, token });
};

module.exports.getProfile = async (req, res, next) => {
  
    res.status(200).json({ user: req.user });

}   

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out successfully' });
}