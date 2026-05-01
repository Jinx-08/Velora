const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const usercontroller = require('../controllers/user.controller');



router.post('/register', [
    body('name.firstname').notEmpty({ min: 3 }).withMessage('First name is required'),
    body('name.lastname').notEmpty({ min: 3 }).withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
usercontroller.registerUser
);






module.exports = router;