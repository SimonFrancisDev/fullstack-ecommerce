const mongoose = require('mongoose');

const disputeSchema = new mongoose.Schema({
    order: {type: mongoose.Schema.Types.ObjectId, ref:"Order", required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    reason: {
        type: String, 
        enum: ["What i ordered vs what i got", "product is not sealed"],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Open", "Resolved"],
        default: "Open"
    }, 
    resolution: "String"
}, {timestamps: true});

module.exports = mongoose.model("Dispute", disputeSchema);