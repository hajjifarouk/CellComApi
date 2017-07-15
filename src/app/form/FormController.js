var Form = require('./form.model.js');

// Display list of all forms
exports.get = function (req, res) {
    Form.find()
        .then(forms => res.send(forms))
        .catch(error => res.send(error));
};
// Display list of all forms for a specific process
exports.getByProcess = function (req, res) {
    let process = req.params.process;
    Form.find({ process: process })
        .then(forms => res.send(forms))
        .catch(error => res.send(error));
};
// Display one form by id
exports.getOneById = function (req, res) {
    let id = req.params.id;
    Form.find({ id: id })
        .then(form => res.send(form))
        .catch(error => res.send(error));
};
// Creates one form
exports.add = function (req, res) {
    const newForm = new Form({
        ref: req.params.ref,
        title: req.params.title,
        description: req.params.description,
        questions: req.params.questions,
        process: req.params.process
    });
    newForm.save()
        .then(form => res.send(form))
        .catch(error => res.send(error));
};
// Updates one form
exports.edit = function (req, res) {
    let id = req.params.id;
    Form.update({ id: id },
        {
            $set: {
                ref: req.params.ref,
                title: req.params.title,
                description: req.params.description,
                questions: req.params.questions,
                process: req.params.process
            }
        },
        { upsert: true })
        .then(form => res.send(form))
        .catch(error => res.send(error));
};
// Removes one form
exports.delete = function (req, res) {
    let id = req.params.id;
    Form.remove({ id: id })
        .then(form => res.send(form))
        .catch(error => res.send(error));
};