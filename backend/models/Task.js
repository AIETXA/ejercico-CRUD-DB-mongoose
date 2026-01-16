const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String 
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date,
        default: false
    },
    priority: {
        type: String,
        enum: ['high','medium', 'low'],
        default: 'medium'
    },
    folder: {
        type: String,
        default: 'general'
    },
    dueDate: {
        type: Date,
        default: null
    },
    reminderDate: {
        type:Date,
        required:false
    },
    postponed: {
        type: Boolean,
        default: false
    },
    /*postponedCount: {
        type: Number,
        default: 0
    },
    postponedHistory: [{
        from: Date,
        to: Date,
        postponedAt: {
            type: Date,
            default: Date.now
        }
    }],*/
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true


    }

}, {
    timestamps: true
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;