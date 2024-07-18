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
    const contribution = new Contribution({
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        author: req.body.author,
        date: req.body.date
    });

    try {
        const newContribution = await contribution.save();
        res.status(201).json(newContribution);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getContributions, createContribution };

