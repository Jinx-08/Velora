const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captaincontroller = require("../controllers/captain.controller");


router.post('/register', [
    body('name.firstname').notEmpty({ min: 3 }).withMessage('First name is required'),
    body('name.lastname').notEmpty({ min: 3 }).withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'), 
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicles.color').notEmpty({ min: 3 }).withMessage('Vehicle color is required'),
    body('vehicles.plate').notEmpty({ min: 3 }).withMessage('Vehicle plate number is required'),
    body('vehicles.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicles.vehicletype').notEmpty().withMessage('Vehicle type is required'),
], captaincontroller.registerCaptain
);




module.exports = router;