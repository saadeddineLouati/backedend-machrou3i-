const router = require('express').Router();
let task = require('../models/task');
var passport	    = require('passport');


router.route('/').get((req, res) => {
    task.find()
        .populate('owner')
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/getprojectsbytask', passport.authenticate('jwt', { session: false }), (req, res)=>{
    task.find({})
    .where('owner').equals(req.user._id)
    .populate({
        path: 'taskgroup',
        model: 'Tasksgroup',
        populate: {
            path: 'project',
            model: 'Project'
        }})
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/taskpop').post((req, res) => {
    task.findById(req.body._id)
        .populate({
            path: 'taskgroup',
            model: 'Tasksgroup',
            populate: {
                path: 'project',
                model: 'Project',
                populate: {
                    path: 'owner',
                    model: 'User'
                }
            }
        }).then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/gettaskbycard').post((req, res) => {
    task.find({ taskgroup: req.body._id })
        .populate('owner')

        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/addtask').post((req, res) => {
    console.log(req.body)
    task.create({
        title: req.body.title,
        description: req.body.description,
        status: 'New',
        priority: req.body.priority,
        deadline: req.body.deadline,
        taskgroup: req.body.taskgroup,
        owner: req.body.owner
    })
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});

router.route('/removetask').post((req, res) => {
    task.findByIdAndRemove(req.body._id)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});

router.route('/updatetask/:id').post((req, res) => {
    var query = { _id: req.params.id },
        update = {
            title: req.body.title,
            progress: parseInt(req.body.kind) / 100,
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

router.route('/updatetaskstatus').post((req, res) => {
    var query = { _id: req.body._id },
        update = {
            progress: parseInt(req.body.progress)/100
        },
        options = { upsert: true, new: true, setDefaultsOnInsert: true }

    task.findOneAndUpdate(query, update, options)
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
})

module.exports = router;