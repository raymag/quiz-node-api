const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

const Question = require('./models/Question') // includes our model
const Subject = require('./models/Subject')

// get all quiz questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find()
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// get one quiz question
router.get('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const question = await (await Question.findOne({_id})).populate("subjects").execPopulate()       
        if(!question){
            return res.status(404).json({})
        }else{
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// create one quiz question
router.post('/questions', async (req, res) => {
    try {
        const { description } = req.body
        const { alternatives } = req.body

        const question = await Question.create({
            description,
            alternatives
        })

        return res.status(201).json(question)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// update one quiz question
router.put('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 
        const { description, alternatives, subjects } = req.body

        let question = await Question.findOne({_id})

        if(!question){
            question = await Question.create({
                description,
                alternatives,
                subjects
            })    
            return res.status(201).json(question)
        }else{
            // updates only the given fields
            if (description) {
                question.description = description
            }
            if (alternatives) {
                question.alternatives = alternatives
            }
            if (subjects) {
                question.subjects = subjects.map((subject) => mongoose.Types.ObjectId(subject))
            }
            await question.save()
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

// delete one quiz question
router.delete('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const question = await Question.deleteOne({_id})

        if(question.deletedCount === 0){
            return res.status(404).json()
        }else{
            return res.status(204).json()
        }
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

//creates a new subject
router.post('/subject', async (req, res) => {
    try {
        const {name} = req.body;
        const subject = await Subject.create({name})
        return res.status(200).json(subject)    
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

//get all subjects
router.get('/subject', async (req, res) => {
    try {
        const subjects = await Subject.find()
        return res.status(200).json(subjects)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

//get all questions from a specific subject
router.get('/question/subject/:id', async (req, res) => {
    try {
        const _id = req.params.id 

        const questions = await Question.find({ subjects: _id });
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

module.exports = router