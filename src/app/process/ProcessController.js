var Process = require('./process.model.js');

// Display list of all processs
exports.get = function (req, res) {
    Process.find()
        .populate('chef')
        .then(processs => res.send(processs))
        .catch(error => res.send(error));
};
// Display one process by id
exports.getOneById = function (req, res) {
    let id = req.params.id;
    Process.find({ _id: id })
        .populate('chef')
        .then(process => res.send(process))
        .catch(error => res.send(error));
};
// Creates one process
exports.add = function (req, res) {
    const newProcess = new Process({
        name: req.body.name,
        description: req.body.description,
        chef: req.body.chef
    });
    newProcess.save()
        .populate('chef')
        .then(process => res.send(process))
        .catch(error => res.send(error));
};
// Updates one process
exports.edit = function (req, res) {
    let id = req.params.id;
    Process.update({ _id: id },
        {
            $set: {
                name: req.body.name,
                description: req.body.description,
                chef: req.body.chef
            }
        },
        { upsert: true })
        .populate('chef')
        .then(process => res.send(process))
        .catch(error => res.send(error));
};
// Removes one process
exports.delete = function (req, res) {
    let id = req.params.id;
    Process.remove({ _id: id })
        .populate('chef')
        .then(process => res.send(process))
        .catch(error => res.send(error));
};