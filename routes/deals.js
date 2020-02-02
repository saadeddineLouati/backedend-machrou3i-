const router = require('express').Router();
let deal = require('../models/deal');
let notification = require('../models/notification');
var userController  = require('../controller/user-controller');
var passport	    = require('passport');

router.post('/newdeal', passport.authenticate('jwt', { session: false }), (req, res)=>{
    deal.create({
        'title': req.body.title,
        'description': req.body.description,
        'size': req.body.size,
        'kind': req.body.kind,
        'start': req.body.start,
        'deadline': req.body.deadline,
        'company': req.user.company,
        'owner': req.user._id
    })
    .then(deals => res.json(deals))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get("/", (req, res)=>{
    deal.find({})
    .populate('owner')
    .then(deals => {
        res.json(deals);
        
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

router.post('/sendnotif', passport.authenticate('jwt', { session: false }), (req, res)=>{
    notification.create({
        'title': req.body.title,
        'description': req.body.description,
        'status': req.body.start,
        'sender': req.user._id, 
        'reciever': req.body.reciever, 
    })
    .then(not => res.json(not))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/notifications', passport.authenticate('jwt', { session: false }), (req, res)=>{
    notification.find({"reciever": req.user._id})
    .populate('sender')
    .then(not => res.json(not))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;