var Answer = require('./answer.model.js');

// Display list of all answers
exports.get = function (req, res) {
    Answer.find()
        .populate('question')
        .then(answers => res.send(answers))
        .catch(error => res.send(error));
};
// Display list of all answers for a specific process
exports.getByProcess = function (req, res) {
    let process = req.params.process;
    Answer.find({ process: process })
        .populate('question')
        .then(answers => res.send(answers))
        .catch(error => res.send(error));
};
// Display one answer by id
exports.getOneById = function (req, res) {
    let id = req.params.id;
    Answer.find({ _id: id })
        .populate('question')
        .then(answer => res.send(answer))
        .catch(error => res.send(error));
};
// Creates one answer
exports.add = function (req, res) {
    const newAnswer = new Answer({
        text: req.body.text,
        question: req.body.question
    });
    newAnswer.save()
        .populate('question')
        .then(answer => res.send(answer))
        .catch(error => res.send(error));
};
// Updates one answer
exports.edit = function (req, res) {
    let id = req.params.id;
    Answer.update({ _id: id },
        {
            $set: {
                text: req.body.text,
                question: req.body.question
            }
        },
        { upsert: true })
        .populate('question')
        .then(answer => res.send(answer))
        .catch(error => res.send(error));
};
// Removes one answer
exports.delete = function (req, res) {
    let id = req.params.id;
    Answer.remove({ _id: id })
        .populate('question')
        .then(answer => res.send(answer))
        .catch(error => res.send(error));
};
