const mongoose = require('mongoose')

const QuestionSchema = new mongoose.Schema({
    description: String,
    alternatives: [
        {
            text: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    ],
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: false
    }]
})

module.exports = mongoose.model('Question', QuestionSchema)