const express = require('express');
const router = express.Router();
const StorageTank = require('../models/storageTank');

router.post('/', async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty" });
    }
    try {
        const newStorageTank = new StorageTank({
            tankId: req.body.tankId,
            capacity: req.body.capacity,
            installedDate: req.body.installedDate,
            manufacturer: req.body.manufacturer,
            specialNotes: req.body.specialNotes,
            availableMilk: 0,
        });

        await newStorageTank.save();
        res.status(201).json({ success: true, data: newStorageTank });
    } catch (error) {
        console.error('Error adding storage tank:', error);
        res.status(500).json({ success: false, error: 'Failed to add storage tank' });
    }
});

router.get('/', async (req, res) => {
    try {
        const storageTank = await StorageTank.find();
        res.status(200).json({ success: true, data: storageTank });
    } catch (error) {
        console.error('Error fetching storage tanks:', error);
        res.status(500).json({ success: false, error: 'Failed to fetch storage tanks' });
    }
});

router.put('/:tankId', async (req, res) => {
    const { tankId } = req.params;
    const { storedMilkBatches } = req.body;
    try {
        const updatedTank = await StorageTank.findOneAndUpdate(
            { tankId },
            { storedMilkBatches },
            { new: true } // To return the updated document
        );
        if (!updatedTank) {
            return res.status(404).json({ success: false, error: 'Tank not found' });
        }
        res.status(200).json({ success: true, data: updatedTank });
    } catch (error) {
        console.error('Error updating stored milk batches:', error);
        res.status(500).json({ success: false, error: 'Failed to update stored milk batches' });
    }
});

router.put('/updateAvailableMilk/:tankId', async (req, res) => {
    const { tankId } = req.params;
    const { amountOfMilk } = req.body;
    try {
        // Find the storageTank by tankId and update the availableMilk field
        const updatedTank = await StorageTank.findOneAndUpdate(
            { tankId },
            { $inc: { availableMilk: amountOfMilk } }, // Increment availableMilk by amountOfMilk
            { new: true } // To return the updated document
        );
        if (!updatedTank) {
            return res.status(404).json({ success: false, error: 'Tank not found' });
        }
        res.status(200).json({ success: true, data: updatedTank });
    } catch (error) {
        console.error('Error updating available milk:', error);
        res.status(500).json({ success: false, error: 'Failed to update available milk' });
    }
});

router.put('/subtractAvailableMilk/:tankId', async (req, res) => {
    const { tankId } = req.params;
    const { amountToSubtract } = req.body;
    try {
        const updatedTank = await StorageTank.findOneAndUpdate(
            { tankId },
            { $inc: { availableMilk: +amountToSubtract } },
            { new: true } 
        );
        if (!updatedTank) {
            return res.status(404).json({ success: false, error: 'Tank not found' });
        }
        res.status(200).json({ success: true, data: updatedTank });
    } catch (error) {
        console.error('Error subtracting available milk:', error);
        res.status(500).json({ success: false, error: 'Failed to subtract available milk' });
    }
});

router.delete('/:tankId', async (req, res) => {
    const { tankId } = req.params;
    try {
        const deletedTank = await StorageTank.findOneAndDelete({ tankId });
        if (!deletedTank) {
            return res.status(404).json({ success: false, error: 'Tank not found' });
        }
        res.status(200).json({ success: true, data: deletedTank });
    } catch (error) {
        console.error('Error deleting tank:', error);
        res.status(500).json({ success: false, error: 'Failed to delete tank' });
    }
});

module.exports = router;
