const router = require('express').Router();
let message = require('../models/message');
var passport	    = require('passport');

router.get('/messages', passport.authenticate('jwt', { session: false }),(req, res)=>{
    let sent;
    let recieved
    message.find({
        sender: req.user._id
    })
    .then(messages => {
        sent=messages
        message.find({
            reciever: req.user._id
        })
        .then(messages => {
            recieved=messages
            res.send(sent.concat(recieved));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/newMessage",passport.authenticate('jwt', { session: false }), (req, res) =>{
    message.create({
        message: req.body.message,
        sender: req.user._id,
        reciever: req.body.reciever
    })
    .then(m => res.json(m))
    .catch(err => res.status(400).json({ "Error": err }))

})

router.post('/chatwith', passport.authenticate('jwt', { session: false }),(req, res)=>{
    let sent;
    let recieved
    console.log("body : "+JSON.stringify(req.body));
    message.find({})
    .where('sender').equals(req.user._id)
    .where('reciever').equals(req.body._id)
    .populate('sender') 
    .populate('reciever') 
    .then(messages => {
        sent=messages
        console.log("Sent : ");
        console.log(sent);

        message.find({})
        .where('reciever').equals(req.user._id)
        .where('sender').equals(req.body._id)
        .populate('sender') 
        .populate('reciever') 
        .then(messages => {
            recieved=messages
            console.log("Recieved : ");
            console.log(recieved);
            res.send(sent.concat(recieved));
        })
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router