const mongoose = require('mongoose');

const RoundwiseDataSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:[true,"user id is missing"],
    },
    roundNo:{
        type: Number,
        required:[true, "round number is missing"],
    },
    screenTime:{
        type: Number,
        required: [true,"screentime is missing"]
    },
    sliderValue:{
        type: Number,
        required: [true, 'slider value is missing']
    },
    hiddenProb:{
        type: Number,
        required: [true, 'Hidden probability is missing']
    },
    cumlativeScore:{
        type: Number,
        required: [true,'cumlativeScore is not provided'],
    },
    changedInCumlative:{
        type: Number,
        required: [true, 'ChnagedInCumlative field is missing']
    },
    ringColor:{
        type: Number,
        required: [true, 'ring color is not mentioned']
    }
});
RoundwiseDataSchema.index({userId:1, roundNo:1}, {unique:true})

const RoundwiseData = mongoose.model("RoundwiseData",RoundwiseDataSchema);

module.exports = RoundwiseData;