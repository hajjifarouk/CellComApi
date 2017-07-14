var Process = require('./process.model.js');

// Display list of all processs
exports.getProcesss = function (req, res) {
    Process.find()
        .then(processs => res.send(processs))
        .catch(error => res.send(error));
};
// Display one process by id
exports.getOneProcessById = function (req, res) {
    let id = req.params.id;
    Process.find({ id: id })
        .then(process => res.send(process))
        .catch(error => res.send(error));
};
// Creates one process
exports.addProcess = function (req, res) {
    const newProcess = new Process({
        name: req.params.name,
        description: req.params.description,
        chef: req.params.chef
    });
    newProcess.save()
        .then(process => res.send(process))
        .catch(error => res.send(error));
};
// Updates one process
exports.editProcess = function (req, res) {
    let id = req.params.id;
    Process.update({ id: id },
        {
            $set: {
                name: req.params.name,
                description: req.params.description,
                chef: req.params.chef
            }
        },
        { upsert: true })
        .then(process => res.send(process))
        .catch(error => res.send(error));
};
// Removes one process
exports.deleteProcess = function (req, res) {
    let id = req.params.id;
    Process.remove({ id: id })
        .then(process => res.send(process))
        .catch(error => res.send(error));
};