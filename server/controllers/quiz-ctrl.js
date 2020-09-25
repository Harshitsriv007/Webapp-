const Quiz = require('../models/quiz-model')

createQuiz = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide MCQ with Answer',
        })
    }

    const quiz = new Quiz(body)

    if (!quiz) {
        return res.status(400).json({ success: false, error: err })
    }

    quiz
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: quiz._id,
                message: 'MCQ created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'MCQ not created!',
            })
        })
}

updateQuiz = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Quiz.findOne({ _id: req.params.id }, (err, quiz) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Quiz not found!',
            })
        }
        quiz.question = body.question
        quiz.answer = body.answer
        quiz
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: quiz._id,
                    message: 'MCQ updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'MCQ not updated!',
                })
            })
    })
}

deleteQuiz = async (req, res) => {
    await Quiz.findOneAndDelete({ _id: req.params.id }, (err, quiz) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!quiz) {
            return res
                .status(404)
                .json({ success: false, error: `quiz not found` })
        }

        return res.status(200).json({ success: true, data: quiz })
    }).catch(err => console.log(err))
}

getQuizById = async (req, res) => {
    await Quiz.findOne({ _id: req.params.id }, (err, quiz) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!quiz) {
            return res
                .status(404)
                .json({ success: false, error: `Quiz not found` })
        }
        return res.status(200).json({ success: true, data: quiz })
    }).catch(err => console.log(err))
}

getQuizs = async (req, res) => {
    await Quiz.find({}, (err, quizs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!quizs.length) {
            return res
                .status(404)
                .json({ success: false, error: `Quiz not found` })
        }
        return res.status(200).json({ success: true, data: quizs })
    }).catch(err => console.log(err))
}

module.exports = {
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuizs,
    getQuizById,
}
