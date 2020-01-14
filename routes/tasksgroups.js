const router = require('express').Router();
let tasksgroup = require('../models/tasksgroup');


router.route('/').get((req, res) => {
    tasksgroup.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addtasksgroup/:project').post((req, res) => {
    tasksgroup.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        project: req.params.project,
        deadline: req.body.deadline
    })
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});

router.route('/removetaskgroup/:id').get((req, res) => {
    tasksgroup.findByIdAndRemove(req.params.id)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});

router.route('/updatetaskgroup/:id').post((req, res) => {
    var query = { _id: req.params.id },
        update = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            priority: req.body.priority,
            project: req.params.project,
            deadline: req.body.deadline
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true }

        tasksgroup.findOneAndUpdate(query, update, options)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
})

router.route('/updatetaskgroupstatus/:id').post((req, res) => {
    var query = { _id: req.params.id },
        update = {
            status: req.body.status
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true }

        tasksgroup.findOneAndUpdate(query, update, options)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
})

module.exports = router;