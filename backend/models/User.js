const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId:{
        type: Number,
        required:[true,"user id is missing"],
    },
    sessionId: {
        type: Number,
        required: [true, "session id is missing"],
    },
    enterTime:{
        type: String
    }
});


const User = mongoose.model("User", UserSchema);

module.exports = User;