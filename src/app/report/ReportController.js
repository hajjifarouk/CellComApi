var Report,mongoose = require('./report.model.js');

// Display list of all reports
exports.get = function (req, res) {
    Report.find()
        .populate('user')
        .populate('shop')
        .populate('form')
        .populate('answers')
        .populate('process')
        .then(reports => res.send(reports))
        .catch(error => res.send(error));
};
// Display list of all reports for a specific process
exports.getByProcess = function (req, res) {
    let process = req.params.process;
    Report.find({ process: process })
        .populate('user')
        .populate('shop')
        .populate('form')
        .populate('answers')
        .populate('process')
        .then(reports => res.send(reports))
        .catch(error => res.send(error));
};
// Display one report by id
exports.getOneById = function (req, res) {
    let id = req.params.id;
    Report.find({ _id: id })
        .populate('user')
        .populate('shop')
        .populate('form')
        .populate('answers')
        .populate('process')
        .then(report => res.send(report))
        .catch(error => res.send(error));
};
// Creates one report
exports.add = function (req, res) {
    const newShop = new Shop({
        ref: req.body.ref,
        date: req.body.date,
        user: mongoose.Types.ObjectId(req.body.user),
        shop: mongoose.Types.ObjectId(req.body.shop),
        form: mongoose.Types.ObjectId(req.body.form),
        answers: req.body.answersmap(function (answer) { return mongoose.Types.ObjectId(answer); }),
        process: mongoose.Types.ObjectId(req.body.process)
    });
    newShop.save()
        .then(shop => res.send(shop))
        .catch(error => res.send(error));
};
// Updates one report
exports.edit = function (req, res) {
    let id = req.params.id;
    Shop.update({ _id: id },
        {
            $set: {
                ref: req.body.ref,
                date: req.body.date,
                user: mongoose.Types.ObjectId(req.body.user),
                shop: mongoose.Types.ObjectId(req.body.shop),
                form: mongoose.Types.ObjectId(req.body.form),
                answers: req.body.answersmap(function (answer) { return mongoose.Types.ObjectId(answer); }),
                process: mongoose.Types.ObjectId(req.body.process)
            }
        },
        { upsert: true })
        .populate('user')
        .populate('shop')
        .populate('form')
        .populate('answers')
        .populate('process')
        .then(shop => res.send(shop))
        .catch(error => res.send(error));
};
// Removes one report
exports.delete = function (req, res) {
    let id = req.params.id;
    Report.remove({ _id: id })
        .populate('user')
        .populate('shop')
        .populate('form')
        .populate('answers')
        .populate('process')
        .then(report => res.send(report))
        .catch(error => res.send(error));
};