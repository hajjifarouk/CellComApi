var Question = require('./question.model.js');

// Display list of all questions
exports.get = function (req, res) {
    Question.find()
        .populate('choices')
        .then(questions => res.send(questions))
        .catch(error => res.send(error));
};
// Display list of all questions for a specific process
exports.getByProcess = function (req, res) {
    let process = req.params.process;
    Question.find({ process: process })
        .populate('choices')
        .then(questions => res.send(questions))
        .catch(error => res.send(error));
};
// Display one question by id
exports.getOneById = function (req, res) {
    let id = req.params.id;
    Question.find({ _id: id })
        .populate('choices')
        .then(question => res.send(question))
        .catch(error => res.send(error));
};
// Creates one question
exports.add = function (req, res) {
    const newQuestion = new Question({
        text: req.body.body,
        kind: req.body.type,
        choices: req.body.choices
    });
    newQuestion.save()
        .populate('choices')
        .then(question => res.send(question))
        .catch(error => res.send(error));
};
// Updates one question
exports.edit = function (req, res) {
    let id = req.params.id;
    Question.update({ _id: id },
        {
            $set: {
                text: req.body.body,
                kind: req.body.type,
                choices: req.body.choices
            }
        },
        { upsert: true })
        .populate('choices')
        .then(question => res.send(question))
        .catch(error => res.send(error));
};
// Removes one question
exports.delete = function (req, res) {
    let id = req.params.id;
    Question.remove({ _id: id })
        .populate('choices')
        .then(question => res.send(question))
        .catch(error => res.send(error));
};