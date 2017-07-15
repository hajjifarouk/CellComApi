var Shop = require('./shop.model.js');

// Display list of all shops
exports.get = function (req, res) {
    Shop.find()
        .then(shops => res.send(shops))
        .catch(error => res.send(error));
};
// Display list of all shops for a specific process
exports.getByProcess = function (req, res) {
    let process = req.params.process;
    Shop.find({ process: process })
        .then(shops => res.send(shops))
        .catch(error => res.send(error));
};
// Display one shop by id
exports.getOneById = function (req, res) {
    let id = req.params.id;
    Shop.find({ _id: id })
        .then(shop => res.send(shop))
        .catch(error => res.send(error));
};
// Creates one shop
exports.add = function (req, res) {
    const newShop = new Shop({
        code: req.body.code,
        shop_name: req.body.shop_name,
        client_name: req.body.client_name,
        email: req.body.email,
        tel: req.body.tel,
        address: req.body.address,
        city: req.body.city,
        province: req.body.province,
        place: req.body.place,
        process: req.body.process
    });
    newShop.save()
        .then(shop => res.send(shop))
        .catch(error => res.send(error));
};
// Updates one shop
exports.edit = function (req, res) {
    let id = req.params.id;
    Shop.update({ _id: id },
        {
            $set: {
                shop_name: req.body.shop_name,
                client_name: req.body.client_name,
                email: req.body.email,
                tel: req.body.tel,
                address: req.body.address,
                city: req.body.city,
                province: req.body.province,
                place: req.body.place,
                process: req.body.process
            }
        },
        { upsert: true })
        .then(shop => res.send(shop))
        .catch(error => res.send(error));
};
// Removes one shop
exports.delete = function (req, res) {
    let id = req.params.id;
    Shop.remove({ _id: id })
        .then(shop => res.send(shop))
        .catch(error => res.send(error));
};
