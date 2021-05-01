const mongoose = require('mongoose')

const SubjectSchema = new mongoose.Schema({
    name: String
})

module.exports = mongoose.model('Subject', SubjectSchema)