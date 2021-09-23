const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId:{
        type: Number,
        required:[true,"user id is missing"],
        index: true
    },
    sessionId: {
        type: Number,
        required: [true, "session id is missing"],
    },
    day: {
        type: Number,
        required: [true, 'Enter Day No'],
    },
    enterTime:{
        type: String
    },
    lastCompletedRound:{
        type: Number
    }
});


const User = mongoose.model("User", UserSchema);

module.exports = User;