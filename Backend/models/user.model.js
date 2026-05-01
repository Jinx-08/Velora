const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname:{
            type: String,
            required: true,
            minlength:[3, 'First name must be at least 3 characters long'],
        },
        lastname:{
            type: String,
            required: true, 
            minlength:[3, 'Last name must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        minlength:[5, 'Email must be at least 5 characters long'],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    Socketid: {
        type: String,
    },
});


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.static.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const usermodel = mongoose.model('User', userSchema);

module.exports = usermodel;







