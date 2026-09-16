const express = require('express');

const Scanner = require('../models/Scanner');

const router = express.Router();


// CREATE scanner
router.post('/', async (req, res) => {
    try {
        const {
            scannerId,
            tempName,
            checkedOut,
            checklist
        } = req.body;

        const scanner = new Scanner({
            scannerId,
            tempName: tempName || "",
            checkedOut: checkedOut ?? false,
            checklist
        });

        const savedScanner = await scanner.save();

        res.status(201).json(savedScanner);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create scanner.",
            error: error.message
        });
    }
});

// GET BY CHECKLIST
router.get('/checklist/:checklistId', async (req, res) => {
    try {
        const scanners = await Scanner.find({
            checklist: req.params.checklistId
        });

        res.status(200).json(scanners);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve scanners.",
            error: error.message
        });
    }
});


// GET all scanners
router.get('/', async (req, res) => {
    try {
        const scanners = await Scanner.find();

        res.status(200).json(scanners);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve scanners.",
            error: error.message
        });
    }
});


// GET scanner by MongoDB ID
router.get('/:id', async (req, res) => {
    try {
        const scanner = await Scanner.findById(req.params.id);

        if (!scanner) {
            return res.status(404).json({
                message: "Scanner not found."
            });
        }

        res.status(200).json(scanner);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to retrieve scanner.",
            error: error.message
        });
    }
});


// UPDATE scanner
router.patch('/:id', async (req, res) => {
    try {
        const scanner = await Scanner.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!scanner) {
            return res.status(404).json({
                message: "Scanner not found."
            });
        }

        res.status(200).json(scanner);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update scanner.",
            error: error.message
        });
    }
});


// DELETE scanner
router.delete('/:id', async (req, res) => {
    try {
        const scanner = await Scanner.findByIdAndDelete(req.params.id);

        if (!scanner) {
            return res.status(404).json({
                message: "Scanner not found."
            });
        }

        res.status(200).json({
            message: "Scanner deleted successfully."
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete scanner.",
            error: error.message
        });
    }
});


module.exports = router;