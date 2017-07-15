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
    Shop.find({ id: id })
        .then(shop => res.send(shop))
        .catch(error => res.send(error));
};
// Creates one shop
exports.add = function (req, res) {
    const newShop = new Shop({
        code: req.params.code,
        shop_name: req.params.shop_name,
        client_name: req.params.client_name,
        email: req.params.email,
        tel: req.params.tel,
        address: req.params.address,
        city: req.params.city,
        province: req.params.province,
        place: req.params.place,
        process: req.params.process
    });
    newShop.save()
        .then(shop => res.send(shop))
        .catch(error => res.send(error));
};
// Updates one shop
exports.edit = function (req, res) {
    let id = req.params.id;
    Shop.update({ id: id },
        {
            $set: {
                shop_name: req.params.shop_name,
                client_name: req.params.client_name,
                email: req.params.email,
                tel: req.params.tel,
                address: req.params.address,
                city: req.params.city,
                province: req.params.province,
                place: req.params.place,
                process: req.params.process
            }
        },
        { upsert: true })
        .then(shop => res.send(shop))
        .catch(error => res.send(error));
};
// Removes one shop
exports.delete = function (req, res) {
    let id = req.params.id;
    Shop.remove({ id: id })
        .then(shop => res.send(shop))
        .catch(error => res.send(error));
};
