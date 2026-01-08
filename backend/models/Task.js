const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,

    completed: {
        type: Boolean,
        default: false
    },
    reminderDate: {
        type:Date,
        required:false
    },
    priority: {
        type: String,
        enum: ['high','medium', 'low'],
        default: 'medium'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true


    }

}, {
    timestamps: true
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;