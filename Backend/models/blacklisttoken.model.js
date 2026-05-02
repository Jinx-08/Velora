const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,       
        required: true,
        unque: true,
    },
    expiresAt: {        
        type: Date,
        default: Date.now,
        expires: 86400,
    },
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);