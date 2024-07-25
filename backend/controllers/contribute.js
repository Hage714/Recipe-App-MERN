const Contribution = require('../models/contribute'); 

const getContributions = async (req, res) => {
    try {
        const contributions = await Contribution.find();
        res.json(contributions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createContribution = async (req, res) => {
try {
    const contribution = new Contribution(req.body);
    await contribution.save();
    res.status(201).json(contribution);
} catch (error) {
    res.status(400).json({ message: error.message });
}
};

module.exports = { getContributions, createContribution };

