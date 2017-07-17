let User = require('./user.model.js');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let auth = require('basic-auth');
let nodemailer = require('nodemailer');
let randomstring = require('randomstring');
let config = require('../../config/config.json');
var fs = require('fs');


function checkToken(req) {
    const token = req.headers['x-access-token'];
    if (token) {
        try {
            var decoded = jwt.verify(token, config.secret);
            return decoded.message === req.params.id;
        } catch (err) {
            return false;
        }
    } else {
        return false;
    }
};

// Display list of all users
exports.get = function (req, res) {
    User.find()
        .populate('process')
        .populate('place')
        .then(users => res.send(users))
        .catch(error => res.send(error));
};
// Display list of all users for a specific process
exports.getByProcess = function (req, res) {
    let process = req.params.process;
    User.find({ process: process })
        .populate('process')
        .populate('place')
        .then(users => res.send(users))
        .catch(error => res.send(error));
};
// Display one user by id
exports.getOneById = function (req, res) {
    let id = req.params.id;
    User.find({ _id: id })
        .populate('process')
        .populate('place')
        .then(shop => res.send(shop))
        .catch(error => res.send(error));
};
exports.getOneByEmail = function (req, res) {
    let email = req.params.email;
    User.find({ eamil: email })
        .populate('process')
        .populate('place')
        .then(shop => res.send(shop))
        .catch(error => res.send(error));
};
// Creates one user (for admin)
exports.add = function (req, res) {
    const random = randomstring.generate(8);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(random, salt);
    const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        tel: req.body.tel,
        isActive: req.body.isActive,
        isOnline: req.body.isOnline,
        hashed_password: hash,
        img: req.body.img,
        place: req.body.place,
        process: req.body.process,
        role: req.body.role
    });
    newUser.save()
        .then(shop => res.send(shop)) //TODO : send welcome mail
        .catch(error => res.send(error));
};
// Creates one user (for user)
exports.register = function (req, res) {
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        tel: req.body.tel,
        isActive: req.body.isActive,
        isOnline: req.body.isOnline,
        hashed_password: hash,
        img: req.body.img,
        place: req.body.place,
        process: req.body.process,
        role: req.body.role
    });
    newUser.save()
        .then(shop => res.send(shop)) //TODO : send welcome mail
        .catch(error => res.send(error));
};
// Updates one user by id
exports.edit = function (req, res) {
    let id = req.params.id;
    User.update({ _id: id },
        {
            $set: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                tel: req.body.tel,
                isActive: req.body.isActive,
                isOnline: req.body.isOnline,
                hashed_password: hash,
                img: req.body.img,
                place: req.body.place,
                process: req.body.process,
                role: req.body.role
            }
        },
        { upsert: true })
        .then(user => res.send(user))
        .catch(error => res.send(error));
};
// Updates one user by email
exports.editByEmail = function (req, res) {
    let email = req.params.email;
    User.update({ _id: id },
        {
            $set: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                tel: req.body.tel,
                isActive: req.body.isActive,
                isOnline: req.body.isOnline,
                hashed_password: hash,
                img: req.body.img,
                place: req.body.place,
                process: req.body.process,
                role: req.body.role
            }
        },
        { upsert: true })
        .then(user => res.send(user))
        .catch(error => res.send(error));
};
// Removes one user by id
exports.delete = function (req, res) {
    let id = req.params.id;
    User.remove({ _id: id })
        .then(user => res.send(user))
        .catch(error => res.send(error));
};
// Removes one user by email
exports.deleteByEmail = function (req, res) {
    let email = req.params.email;
    User.remove({ email: email })
        .then(user => res.send(user))
        .catch(error => res.send(error));
};
// Login
exports.login = function (req, res) {
    const credentials = auth(req);
    if (!credentials) res.send("invalid request");
    else {
        const email = credentials.name;
        const password = credentials.pass;
        User.find({ email: email })
            .then(users => {
                if (users.length == 0) {
                    res.send({ status: 404, message: 'User Not Found !' });
                } else {
                    return users[0];
                }
            })
            .then(user => {
                const hashed_password = user.hashed_password;
                if (bcrypt.compareSync(password, hashed_password)) {
                    user => {
                        User.update({ _id: user._id },
                            {
                                $set: {
                                    isOnline: true
                                }
                            },
                            { upsert: true });
                        res.send(user);
                    }
                } else {
                    res.send({ status: 401, message: 'Invalid Credentials !' });
                }
            })
            .catch(err => res.send(error));
    }
};
// Logout
exports.logout = function (req, res) {
    // TODO : logout function
};
resetPasswordFinish = function (email, token, password) {
    new Promise((resolve, reject) => {
    User.find({ email: email })
        .then(users => {
            let user = users[0];
            const diff = new Date() - new Date(user.temp_password_time);
            const seconds = Math.floor(diff / 1000);
            console.log(`Seconds : ${seconds}`);
            if (seconds < 120) {
                return user;
            } else {
                reject({ status: 401, message: 'Time Out ! Try again' });
            }
        })
        .then(user => {
            if (bcrypt.compareSync(token, user.temp_password)) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                user.hashed_password = hash;
                user.temp_password = undefined;
                user.temp_password_time = undefined;
                return user.save();
            } else {
                reject({ status: 401, message: 'Invalid Token !' });
            }
        })
        .then(user => resolve({ status: 200, message: 'Password Changed Sucessfully !' }))
        .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));
    });
};
resetPasswordInit =function(email){
	new Promise((resolve, reject) => {
		const random = randomstring.generate(8);
		user.find({ email: email })
		.then(users => {
			if (users.length == 0) {
				reject({ status: 404, message: 'User Not Found !' });
			} else {
				let user = users[0];
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(random, salt);
				user.temp_password = hash;
				user.temp_password_time = new Date();
				return user.save();
			}
		})
		.then(user => {
			const transporter = nodemailer.createTransport(`smtps://${config.email}:${config.password}@smtp.gmail.com`);
			const mailOptions = {
    			from: `"${config.name}" <${config.email}>`,
    			to: email,  
    			subject: 'Reset Password Request ', 
    			html: `Hello ${user.name},<br><br>
    			&nbsp;&nbsp;&nbsp;&nbsp; Your reset password token is <b>${random}</b>. 
    			If you are viewing this mail from a Android Device click this <a href = "http://learn2crack/${random}">link</a>. 
    			The token is valid for only 2 minutes.<br><br>
    			Thanks,<br>
    			Learn2Crack.`
			};
			return transporter.sendMail(mailOptions);
		})
		.then(info => {
			console.log(info);
			resolve({ status: 200, message: 'Check mail for instructions' })
		})
		.catch(err => {
			console.log(err);
			reject({ status: 500, message: 'Internal Server Error !' });
		});
	});
};
// reset Password
exports.resetPassword = function (req, res) {
    const email = req.params.id;
    const token = req.body.token;
    const newPassword = req.body.password;
    if (!token || !newPassword || !token.trim() || !newPassword.trim()) {
        resetPasswordInit(email)
            .then(result => res.status(result.status).json({ message: result.message }))
            .catch(err => res.status(err.status).json({ message: err.message }));
    } else {
        resetPasswordFinish(email, token, newPassword)
            .then(result => res.status(result.status).json({ message: result.message }))
            .catch(err => res.status(err.status).json({ message: err.message }));
    }
};
// change Password
exports.changePassword = function (req, res) {
    const oldPassword = req.body.password;
    const newPassword = req.body.newPassword;
    User.find({ email: email })
        .then(users => {
            let user = users[0];
            const hashed_password = user.hashed_password;
            if (bcrypt.compareSync(oldPassword, hashed_password)) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(newPassword, salt);
                user.hashed_password = hash;
                return user.save();
            } else {
                res.send({ status: 401, message: 'Invalid Old Password !' });
            }
        })
        .then(user => res.send({ status: 200, message: 'Password Updated Sucessfully !' }))
        .catch(err => res.send({ status: 500, message: 'Internal Server Error !' }));
};
