const router = require('express').Router();
let tasksgroup = require('../models/tasksgroup');


router.route('/').get((req, res) => {
    tasksgroup.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getTaskGroupById').post((req, res) => {
    tasksgroup.findById(req.body._id)
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getTaskGroupByProject').post((req, res) => {
    console.log('req.body')
    console.log(req.body)
    tasksgroup.find({project:req.body._id})
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addtasksgroup').post((req, res) => {
    tasksgroup.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        project: req.body.project,
        deadline: req.body.deadline
    })
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});

router.route('/removetaskgroup').post((req, res) => {
    console.log(req.body);
    tasksgroup.findByIdAndDelete(req.body._id)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});

router.route('/updatetaskgroup').post((req, res) => {
    var query = { _id: req.body._id },
        update = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            priority: req.body.priority,
            project: req.params.project,
            deadline: req.body.deadline
        },
        options = { upsert: true, new: false, setDefaultsOnInsert: true }

        tasksgroup.findOneAndUpdate(query, req.body, options)
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