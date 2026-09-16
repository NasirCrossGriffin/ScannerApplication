const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const checklistSchema = new Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Checklist', checklistSchema);