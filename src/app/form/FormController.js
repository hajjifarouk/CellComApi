var Form = require('./form.model.js');

// Display list of all forms
exports.getForms = function (req, res) {
    Shop.find()
        .then(shops => res.send(shops))
        .catch(error => res.send(error));
};
// Display list of all forms for a specific process
exports.getFormsByProcess = function (req, res) {
    let process = req.params.process;
    Form.find({ process: process })
        .then(forms => res.send(forms))
        .catch(error => res.send(error));
};
// Display one form by id
exports.getOneFormById = function (req, res) {
    let id = req.params.id;
    Form.find({ id: id })
        .then(form => res.send(form))
        .catch(error => res.send(error));
};
// Creates one form
exports.addForm = function (req, res) {
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
exports.editForm = function (req, res) {
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
exports.deleteForm = function (req, res) {
    let id = req.params.id;
    Form.remove({ id: id })
        .then(form => res.send(form))
        .catch(error => res.send(error));
};