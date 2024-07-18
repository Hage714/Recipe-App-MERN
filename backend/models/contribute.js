const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['monthly', 'one-time'],
    },
    amount: {
        type: Number,
        required: true,
        min: 1, // Ensure positive amount
    },
    customAmount: {
        type: Number,
        min: 0, // Allow 0 for custom amount
    },
    stripeChargeId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Contribution', ContributionSchema);
