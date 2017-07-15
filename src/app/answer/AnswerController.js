var Answer = require('./answer.model.js');

// Display list of all answers
exports.get = function (req, res) {
    Answer.find()
        .then(answers => res.send(answers))
        .catch(error => res.send(error));
};
// Display list of all answers for a specific process
exports.getByProcess = function (req, res) {
    let process = req.params.process;
    Answer.find({ process: process })
        .then(answers => res.send(answers))
        .catch(error => res.send(error));
};
// Display one answer by id
exports.getOneById = function (req, res) {
    let id = req.params.id;
    Answer.find({ id: id })
        .then(answer => res.send(answer))
        .catch(error => res.send(error));
};
// Creates one answer
exports.add = function (req, res) {
    const newAnswer = new Answer({
        text: req.params.text,
        questions: req.params.questions
    });
    newAnswer.save()
        .then(answer => res.send(answer))
        .catch(error => res.send(error));
};
// Updates one answer
exports.edit = function (req, res) {
    let id = req.params.id;
    Answer.update({ id: id },
        {
            $set: {
                text: req.params.text,
                questions: req.params.questions
            }
        },
        { upsert: true })
        .then(answer => res.send(answer))
        .catch(error => res.send(error));
};
// Removes one answer
exports.delete = function (req, res) {
    let id = req.params.id;
    Answer.remove({ id: id })
        .then(answer => res.send(answer))
        .catch(error => res.send(error));
};
