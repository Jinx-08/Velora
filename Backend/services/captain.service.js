const captainmodel = require("../models/captain.model");


module.exports.createCaptain = async ({ firstname, lastname, email, password,color, plate, capacity, vehicletype }) => {
    if (!firstname || !lastname || !email || !password  || !color || !plate || !capacity || !vehicletype) {
        throw new Error('All fields are required');
    }
    const captain = await captainmodel.create({
        fullname: {
            firstname,  
            lastname,
        },
        email,
        password,   
        vehicles: {
            color,
            plate,  
            capacity,
            vehicletype,
        },
    });
    return captain;
}
