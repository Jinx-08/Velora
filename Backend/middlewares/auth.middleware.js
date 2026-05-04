const usermodel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/blacklisttoken.model');
const captainmodel = require("../models/captain.model");

module.exports.authenticate = async (req, res, next) => { 
    const cookies = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!cookies) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const blacklistedToken = await blacklistTokenModel.findOne({ token: cookies });
    if (blacklistedToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(cookies, process.env.JWT_SECRET);
        const user = await usermodel.findById(decoded._id);

        req.user = user;

        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

}

module.exports.authenticateCaptain = async (req, res, next) => {
    const cookies = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!cookies) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const blacklistedToken = await blacklistTokenModel.findOne({ token: cookies });
    if (blacklistedToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(cookies, process.env.JWT_SECRET);
        const captain = await captainmodel.findById(decoded._id);
        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.captain = captain;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}