const router = require('express').Router();
let team = require('../models/team');


router.route('/').get((req, res) => {
    team.find()
        .then(teams => res.json(teams))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addteam/:project/:teamgroup').post((req, res) => {
    team.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        members: req.body['members[]'],
        owner: req.user
    })
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});

router.route('/removeteam/:id').get((req, res) => {
    team.findByIdAndRemove(req.params.id)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});

router.route('/updateteam/:id').post((req, res) => {
    var query = { _id: req.params.id },
        update = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            members: req.body['members[]']
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true }

    team.findOneAndUpdate(query, update, options)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
})

router.route('/updateteamstatus/:id').post((req, res) => {
    var query = { _id: req.params.id },
        update = {
            status: req.body.status
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true }

    team.findOneAndUpdate(query, update, options)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
})

module.exports = router;