const Task = require('../models/Task')


//GET

exports.getTasks = async(req, res) => {
    try {
        const tasks = await Task.find({user: req.userId}).sort({createdAt: -1});
        res.json(tasks);
    }catch(error) {
        res.status(500).json({message: error.message});
    }
};

//POST

exports.createTask = async (req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
        user: req.userId
    });
        res.status(201).json(task);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
};

//PUT

exports.updateTask = async(req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id, 
            user: req.userId
        });

        if(!task) {
            return res.status(404).json({message: 'Tarea no encontrada'});
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedTask);
    } catch(error) {
        res.status(400).json({message: error.message});
    }  
};

//DELETE

exports.deleteTask = async(req,res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id, 
            user: req.userId
        });

        if(!task) {
            return res.status(404).json({message: 'Tarea no encontrada'});
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({message: 'Tarea eliminada'});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};