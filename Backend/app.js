const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const cors = require('cors');
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');



connectDB();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);




module.exports = app;
