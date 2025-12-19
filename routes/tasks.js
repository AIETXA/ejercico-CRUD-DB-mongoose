const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

//GET
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

//POST

router.post('/', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
});

//PUT

router.put('/:id', async(req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(task);
    } catch(error) {
        res.status(400).json({message: error.message});
    }  
});

//DELETE

router.delete('/:id', async(req,res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({message: 'Tarea eliminada'});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;