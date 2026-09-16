const express = require('express');

const Checklist = require('../models/Checklist');
const Scanner = require('../models/Scanner');

const router = express.Router();


// CREATE checklist
router.post('/', async (req, res) => {
    try {
        const checklist = new Checklist({
            date: req.body.date || new Date()
        });

        const savedChecklist = await checklist.save();

        res.status(201).json(savedChecklist);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create checklist.",
            error: error.message
        });
    }
});


// GET all checklists
router.get('/', async (req, res) => {
    try {
        const checklists = await Checklist.find()
            .sort({ date: -1 });

        res.status(200).json(checklists);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve checklists.",
            error: error.message
        });
    }
});


// GET checklist by ID
router.get('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findById(req.params.id);

        if (!checklist) {
            return res.status(404).json({
                message: "Checklist not found."
            });
        }

        res.status(200).json(checklist);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve checklist.",
            error: error.message
        });
    }
});


// GET checklist AND its scanners
router.get('/:id/scanners', async (req, res) => {
    try {
        const checklist = await Checklist.findById(req.params.id);

        if (!checklist) {
            return res.status(404).json({
                message: "Checklist not found."
            });
        }

        const scanners = await Scanner.find({
            checklist: req.params.id
        });

        res.status(200).json({
            checklist,
            scanners
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve checklist.",
            error: error.message
        });
    }
});

// GET checklist by date
router.get('/date/:date', async (req, res) => {
    try {
        const date = new Date(req.params.date);

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const checklist = await Checklist.findOne({
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        if (!checklist) {
            return res.status(404).json({
                message: "Checklist not found."
            });
        }

        res.status(200).json(checklist);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve checklist.",
            error: error.message
        });
    }
});

// UPDATE checklist
router.patch('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!checklist) {
            return res.status(404).json({
                message: "Checklist not found."
            });
        }

        res.status(200).json(checklist);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update checklist.",
            error: error.message
        });
    }
});


// DELETE checklist
router.delete('/:id', async (req, res) => {
    try {
        const checklist = await Checklist.findByIdAndDelete(
            req.params.id
        );

        if (!checklist) {
            return res.status(404).json({
                message: "Checklist not found."
            });
        }

        // Delete scanners belonging to this checklist
        await Scanner.deleteMany({
            checklist: req.params.id
        });

        res.status(200).json({
            message: "Checklist and associated scanners deleted."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete checklist.",
            error: error.message
        });
    }
});


module.exports = router;