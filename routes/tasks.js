const router = require('express').Router();
let task = require('../models/task');


router.route('/').get((req, res) => {
    task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addtask/:project/:taskgroup').post((req, res) => {
    task.create({
        title: req.body.title,
        kind: req.body.kind,
        description: req.body.description,
        status: 'New',
        priority: req.body.priority,
        deadline: req.body.deadline,
        project: req.params.project,
        taskgroup: req.params.taskgroup,
        owner: req.user
    })
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});

router.route('/removetask/:id').get((req, res) => {
    task.findByIdAndRemove(req.params.id)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});

router.route('/updatetask/:id').post((req, res) => {
    var query = { _id: req.params.id },
        update = {
            title: req.body.title,
            kind: req.body.kind,
            description: req.body.description,
            status: req.body.status,
            priority: req.body.priority,
            deadline: req.body.deadline,
            taskgroup: req.params.taskgroup,
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true }

    task.findOneAndUpdate(query, update, options)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
})

router.route('/updatetaskstatus/:id').post((req, res) => {
    var query = { _id: req.params.id },
        update = {
            status: req.body.status
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true }

    task.findOneAndUpdate(query, update, options)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
})

module.exports = router;