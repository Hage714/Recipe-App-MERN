const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema({
    contributionType: {
        type: String,
        required: true,
        enum: ['monthly', 'one-time'],
    },
    amount: {
        type: Number,
        required: true,
        min: 1, // Ensure positive amount
    },
    contributorName: {
        type: String,
        required: true,
    },
    contributorEmail: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Contribution', ContributionSchema);
