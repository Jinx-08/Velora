const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const usercontroller = require('../controllers/user.controller');
const authmiddleware = require('../middlewares/auth.middleware');



router.post('/register', [
    body('name.firstname').notEmpty({ min: 3 }).withMessage('First name is required'),
    body('name.lastname').notEmpty({ min: 3 }).withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
usercontroller.registerUser
);

router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
usercontroller.loginUser
);  

router.get('/profile', authmiddleware.authenticate, usercontroller.getProfile);
    

router.get('/logout', authmiddleware.authenticate , usercontroller.logoutUser);


module.exports = router;