const router = require('express').Router();
let Conversation = require('../models/Conversation');


router.route('/').get((req, res) => {
    Conversation.find()
        .populate('reciever')
        .populate('owner')
        .then(Conversations => res.json(Conversations))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addConversation').post((req, res) => {
    Conversation.create({
        message: req.body.message,
        recievers: req.body.reciever['members[]'],
        owner: req.user
    })
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});

router.route('/removeConversation/:id').get((req, res) => {
    Conversation.findByIdAndRemove(req.params.id)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});

module.exports = router;