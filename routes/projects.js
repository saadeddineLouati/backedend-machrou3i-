const router = require('express').Router();
let project = require('../models/project');
var userController  = require('../controller/user-controller');
var passport	    = require('passport');


router.get('/', passport.authenticate('jwt', { session: false }), (req, res)=>{
    project.find({owner: req.user._id})
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/addproject', passport.authenticate('jwt', { session: false }), (req, res)=>{
    project.create({
        title: req.body.title,
        kind: req.body.kind,
        size: req.body.size,
        description: req.body.description,
        status: 'Under studies',
        owner: req.user._id
    })
        .then(p => res.json(p))
        .catch(err => res.status(400).json({ "Error": err }))
});

router.route('/getProjectById').post((req, res) => {
    console.log(req.body);
    project.findById(req.body._id)
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/getprojectbyprojectid').post((req, res) => {
    console.log(req.body);
    project.findById(req.body._id)
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/removeproject').post((req, res) => {
    project.findByIdAndRemove(req.body._id)
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