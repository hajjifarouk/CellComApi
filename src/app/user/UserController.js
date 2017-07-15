let User = require('./user.model.js');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let auth = require('basic-auth');
let nodemailer = require('nodemailer');
let randomstring = require('randomstring');
let config = require('../../config/config.json');

// Display list of all users
exports.get = function(req, res) {
    User.find()
    .populate('process')
    .populate('place')
    .exec(function(error,users){
        if(error) res.send(error);
        if(!users) res.send("no user found");
        res.send(users);
    });
};
// Display list of all users for a specific process
exports.getByProcess = function(req, res) {
    let process=req.params.process;
    User.find({process:process})
    .populate('process')
    .populate('place')
    .exec(function(error,users){
        if(error) res.send(error);
        if(!users) res.send("no user found");
        res.send(users);
    });
};
// Display one user by id
exports.getOneById = function(req, res) {
    let id=req.params.id;
    User.findOne({id:id})
    .populate('process')
    .populate('place')
    .exec(function(error,user){
        if(error) res.send(error);
        if(!user)res.send("no record found with the specified id");
        res.send(user);
    });
};
exports.getOneUserByEmail = function(req, res) {
    let email=req.params.email;
    User.findOne({eamil:email})
    .populate('process')
    .populate('place')
    .exec(function(error,user){
        if(error) res.send(error);
        if(!user)res.send("no record found with the specified email");
        res.send(user);
    });
};
// Creates one user (for admin)
exports.add = function(req, res) {
    let first_name=req.params.first_name;
    let last_name=req.params.last_name;
    let email=req.params.email;
    const random=randomstring.generate(8);
    User.findOne({email:email}).exec(function(error,user){
        if(error) res.send(error);
        else if(user){
            res.send("Email already taken");
        }else{
            const salt=bcrypt.genSaltSync(10);
            const hash=bcrypt.hashSync(random, salt);
            User.create({
                first_name:first_name,
                last_name:last_name,
                email:email,
                isActive:true,
                hashed_password:hash
            }).exec(function(error,user){
                if(error) res.send(error);
                else{
                    // TODO : send welcome mail
                    res.send(user);
                }
            });
        }
    });
};
// Creates one user (for user)
exports.register = function(req, res) {
    let first_name=req.params.first_name;
    let last_name=req.params.last_name;
    let email=req.params.email;
    let password=req.params.password;
    User.findOne({email:email}).exec(function(error,user){
        if(error) res.send(error);
        else if(user){
            res.send("Email already taken");
        }else{
            const salt=bcrypt.genSaltSync(10);
            const hash=bcrypt.hashSync(password, salt);
            User.create({
                first_name:first_name,
                last_name:last_name,
                eamil:email,
                isActive:true,
                hashed_password:hash
            }).exec(function(error,user){
                if(error) res.send(error);
                else{
                    // TODO : send welcome mail
                    res.send(user);
                }
            });
        }
    });
};
// Updates one user by id
exports.edit = function(req, res) {
    let id=req.params.id;
    let updatedUser=req.body.user;
    User.findOne({id:id}).exec(function(error,user){
        if(error) res.send(error);
        else if(!user) res.send("no user found with the specified id");
        else{
            User.update({
                first_name:updatedUser.first_name,
                last_name:updatedUser.last_name,
                email:updatedUser.email,
                isActive:updatedUser.isActive,
                isOnline:updatedUser.isOnline,
                process:updatedUser.process,
                place:updatedUser.place
            }).exec(function(error,updated){
                if(error) res.send(error);
                else res.send(updated);
            });
        }
    });
};
// Updates one user by email
exports.editUserByEmail = function(req, res) {
    let email=req.params.email;
    let updatedUser=req.body.user;
    User.findOne({email:email}).exec(function(error,user){
        if(error) res.send(error);
        else if(!user) res.send("no user found with the specified id");
        else{
            User.update({
                first_name:updatedUser.first_name,
                last_name:updatedUser.last_name,
                email:updatedUser.email,
                isActive:updatedUser.isActive,
                isOnline:updatedUser.isOnline,
                process:updatedUser.process,
                place:updatedUser.place
            }).exec(function(error,updated){
                if(error) res.send(error);
                else res.send(updated);
            });
        }
    });
};
// Removes one user by id
exports.delete = function(req, res) {
    let id=rq.params.id;
    User.findOne({id:id}).exec(function(error,user){
        if(error) res.send(error);
        else if(!user) res.send("no user found with the specified id");
        else{
            User.destroy({id:id}).exec(function(error){
                if(error) res.send(error);
                else res.send(user);
            });
        }
    });
};
// Removes one user by email
exports.deleteUserByEmail = function(req, res) {
    let email=rq.params.email;
    User.findOne({email:email}).exec(function(error,user){
        if(error) res.send(error);
        else if(!user) res.send("no user found with the specified email");
        else{
            User.destroy({id:id}).exec(function(error){
                if(error) res.send(error);
                else res.send(user);
            });
        }
    });
};
// Login
exports.login = function(req, res) {
    const credentials=auth(req);
    if(!credentials) res.send("invalid request");
    else{
        let email=credentials.name;
        let password=credentials.pass;
        User.findOne({email:email}).exec(function(error,user){
            if(error) res.send(error);
            else if(!user) res.send("no user found with the specified email");
            else{
                const hashed_password=user.hashed_password;
                if(bcrypt.compareSync(password,hashed_password)){
                    const token = jwt.sign(user,config.secret,{expiresIn:1440});
                    User.update({id:user.id},{isOnline:true}).exec(function(error,updated){
                        if(error) res.send(error);
                        else res.send({status:200,message:updated[0],token:token});
                    });
                }
            }
        });
    }
};
// Logout
exports.logout = function(req, res) {
    let email=req.params.email;
    User.findOne({email:email}).exec(function(error,user){
        if(error) res.send(error);
        else if(!user) res.send("no user found with the specified email");
        else{
            User.update({email:email},{isOnline:false}).exec(function(error,updated){
                if(error) res.send(error);
                else res.send({status:200,message:updated[0]});
            })
        }
    })
};
// reset Password
exports.resetPassword = function(req, res) {
};
// change Password
exports.changePassword = function(req, res) {
};