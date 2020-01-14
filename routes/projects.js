const router = require('express').Router();
let project = require('../models/project');


router.route('/').get((req, res) => {
    project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addproject').post((req, res) => {
    project.create({
        title: req.body.title,
        kind: req.body.kind,
        size: req.body.size,
        description: req.body.description,
        status: 'Under studies',
        owner: req.user
    })
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});

router.route('/removeproject/:id').get((req, res) => {
    project.findByIdAndRemove(req.params.id)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});

router.route('/updateproject/:id').post((req, res) => {
    var query = { _id: req.params.id },
        update = {
            title: req.body.title,
            kind: req.body.kind,
            size: req.body.size,
            description: req.body.description,
            status: req.body.status
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true }

    project.findOneAndUpdate(query, update, options)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
})

router.route('/updateprojectstatus/:id').post((req, res) => {
    var query = { _id: req.params.id },
        update = {
            status: req.body.status
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true }

    project.findOneAndUpdate(query, update, options)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
})

module.exports = router;