var Form = require('./form.model.js');

// Display list of all forms
exports.get = function (req, res) {
    Form.find()
        .populate('process')
        .populate('questions')
        .populate('questions.choices')
        .then(forms => res.send(forms))
        .catch(error => res.send(error));
};
// Display list of all forms for a specific process
exports.getByProcess = function (req, res) {
    let process = req.params.process;
    Form.find({ process: process })
        .populate('process')
        .populate('questions')
        .populate('questions.choices')
        .then(forms => res.send(forms))
        .catch(error => res.send(error));
};
// Display one form by id
exports.getOneById = function (req, res) {
    let id = req.params.id;
    Form.find({ _id: id })
        .populate('process')
        .populate('questions')
        .populate('questions.choices')
        .then(form => res.send(form))
        .catch(error => res.send(error));
};
// Creates one form
exports.add = function (req, res) {
    const newForm = new Form({
        ref: req.body.ref,
        title: req.body.title,
        description: req.body.description,
        questions: req.body.questions,
        process: req.body.process
    });
    newForm.save()
        .populate('process')
        .populate('questions')
        .populate('questions.choices')
        .then(form => res.send(form))
        .catch(error => res.send(error));
};
// Updates one form
exports.edit = function (req, res) {
    let id = req.params.id;
    Form.update({ _id: id },
        {
            $set: {
                ref: req.body.ref,
                title: req.body.title,
                description: req.body.description,
                questions: req.body.questions,
                process: req.body.process
            }
        },
        { upsert: true })
        .populate('process')
        .populate('questions')
        .populate('questions.choices')
        .then(form => res.send(form))
        .catch(error => res.send(error));
};
// Removes one form
exports.delete = function (req, res) {
    let id = req.params.id;
    Form.remove({ _id: id })
        .populate('process')
        .populate('questions')
        .populate('questions.choices')
        .then(form => res.send(form))
        .catch(error => res.send(error));
};