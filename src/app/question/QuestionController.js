var Question = require('./question.model.js');

// Display list of all questions
exports.getQuestions = function (req, res) {
    Question.find()
        .then(questions => res.send(questions))
        .catch(error => res.send(error));
};
// Display list of all questions for a specific process
exports.getQuestionsByProcess = function (req, res) {
    let process = req.params.process;
    Question.find({ process: process })
        .then(questions => res.send(questions))
        .catch(error => res.send(error));
};
// Display one question by id
exports.getOneQuestionById = function (req, res) {
    let id = req.params.id;
    Question.find({ id: id })
        .then(question => res.send(question))
        .catch(error => res.send(error));
};
// Creates one question
exports.addQuestion = function (req, res) {
    const newQuestion = new Question({
        body: req.params.body,
        type: req.params.type,
        choices: req.params.choices
    });
    newQuestion.save()
        .then(question => res.send(question))
        .catch(error => res.send(error));
};
// Updates one question
exports.editQuestion = function (req, res) {
    let id = req.params.id;
    Question.update({ id: id },
        {
            $set: {
                body: req.params.body,
                type: req.params.type,
                choices: req.params.choices
            }
        },
        { upsert: true })
        .then(question => res.send(question))
        .catch(error => res.send(error));
};
// Removes one question
exports.deleteQuestion = function (req, res) {
    let id = req.params.id;
    Question.remove({ id: id })
        .then(question => res.send(question))
        .catch(error => res.send(error));
};