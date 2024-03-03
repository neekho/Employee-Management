const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const refreshTokenDocument = new Schema({
    userId: { 
        type: String, 
        required: true 

    },

    refreshToken: { 
        type: String, 
        required: true 
    },

    expiresAt: { 
        type: Date, 
        required: true 
    },
    
});



const RefreshToken = mongoose.model('RefreshToken', refreshTokenDocument);
module.exports = RefreshToken;