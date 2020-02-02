const router = require('express').Router();
let meeting = require('../models/meeting');
var passport	    = require('passport');

router.get("/",passport.authenticate('jwt', { session: false }), (req, res) =>{
    meeting.find({members:req.user._id })
        .then(teams => res.json(teams))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post("/newmeeting",passport.authenticate('jwt', { session: false }), (req, res) =>{
    meeting.create({
        title: req.body.title,
        date: req.body.date,
        orgonizer: req.body.orgonizer,
        members: req.body.members
    })
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});


module.exports = router;