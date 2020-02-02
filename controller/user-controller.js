var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var currentu="You need to login first.";
let project = require('../models/project');
let deal = require('../models/deal');

function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 86400
      });
}
 
exports.users = (req, res) =>{
    User.find({})
    .then(u => res.send(u))
    .catch(err=>res.send(err))
}

exports.newDeal = (req, res)=>{

}

exports.developers = (req, res)=>{
    User.find({position: "developer", position:req.user.position})
    .then(u => res.send(u))
    .catch(err=>res.send(err)) 
}

exports.currentuser = (req, res) =>{
   if (!req.user){
    return res.status(400).json({ 'Error': 'You need to login first.' });
}
   else{
    User.findById(req.user._id)
    .then(u => {res.send(u); currentu=u;})
    .catch(err=>res.send(err))
   }
}

exports.currentUserProjects=(req, res)=> {
    if (!req.user){
        return res.status(400).json({ 'Error': 'You need to login first.' });
    }
       else{
        project.find()
        .then(u => {res.send(u); currentu=u;})
        .catch(err=>res.send(err))
       }

}

exports.registerUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'You need to send email and password' });
    }
 
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
 
        if (user) {
            return res.status(400).json({ 'msg': 'The user already exists' });
        }
 
        let newUser = User(req.body);
        newUser.save((err, user) => {
            if (err) {
                console.log(err); 
                return res.status(400).json({ 'msg': err });
            }
            return res.status(201).json(user);
        });
    });
};
 
exports.loginUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'You need to send email and password' });
    }
 
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.status(400).send({ 'msg': err });
        }
        if (!user) {
            return res.status(400).json({ 'msg': 'The user does not exist' });
        }
 
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                return res.status(200).json({
                    token: createToken(user)
                });
            } else {
                return res.status(400).json({ msg: 'The email and password don\'t match.' });
            }
        });
    });
};

module.exports.currentu=currentu;
