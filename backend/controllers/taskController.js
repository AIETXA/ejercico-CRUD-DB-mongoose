const Task = require('../models/Task')


//GET

exports.getTasks = async(req, res) => {
    try {
        const { folder, priority, date } = req.query;

        const filters = { user: req.userId};

        if(folder) {
            filters.folder = folder;
        }

        if(priority) {
            filters.priority = priority;
        }

        if(date) {
            const start = new Date(date);
            start.setHours(0,0,0,0);

            const end = new Date(date);
            end.setHours(23,59,59,999);

            filters.dueDate = {$gte: start, $lte: end};
        }

        if(req.query.completed !== undefined) {
            filters.completed = req.query.completed === 'true';
        }

        if(req.query.postponed !== undefined) {
            filters.postponed = req.query.postponed === 'true';
        }

        const tasks = await Task.find(filters).sort({priority: -1, createdAt: -1});
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
        
        const updatedTask = await Task.findOneAndUpdate(
            {_id: req.params.id, user: req.userId },
            req.body,
            { new: true }
        );

        if(!updatedTask) {
            return res.status(404).json({message: 'Tarea no encontrada'});
        }
        res.json(updatedTask);
    } catch(error) {
        res.status(400).json({message: error.message});
    }  
};

exports.postponeTask = async(req, res) => {
    try {
        const { id } = req.params;
        const { newDueDate } = req.body;

        if(!newDueDate) {
            return res.status(400).json({message: 'Se requiere una nueva fecha'});
        }

        const task = await Task.findOne({_id: id, user: req.userId});

        if(!task) {
            return res.status(404).json({message: 'Error al posponer la tarea'});
        }

        task.postponed = true;
        task.dueDate = new Date(newDueDate);

        await task.save();
        res.json(task);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

exports.completeTask = async(req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndUpdate(
            {_id: id, user: req.userId},
            {
                completed: true,
                completedAt: new Date()
            },
            {new: true}
        );

        if(!task) {
            return res.status(404).json({message: 'Esta tarea no se puede marcar como completada'});
        }

        res.json(task);
    } catch(error) {
        res.status(500).json({message: error.message});
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