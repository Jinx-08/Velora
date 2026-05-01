const usermodel = require('../models/user.model');
const bcrypt = require('bcrypt');


module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    if (!firstname || !lastname || !email || !password) {
        throw new Error('All fields are required');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await usermodel.create({
        fullname: {
            firstname,
            lastname,
        },
        email,
        password: hashedPassword,
    });
    return user;
}
    
