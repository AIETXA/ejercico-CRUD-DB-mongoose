const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
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
    }

}, {
    timestamps: true
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;