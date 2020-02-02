var express         = require('express'),
    routes          = express.Router();
var userController  = require('../controller/user-controller');
var passport	    = require('passport');
 
routes.get('/', userController.users);
routes.get('/developers',passport.authenticate('jwt', { session: false }), userController.developers);
 
routes.post('/register', userController.registerUser);
routes.post('/login', userController.loginUser);
routes.post('/newdeal', userController.newDeal);
 
routes.get('/special', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json(req.user);
});

routes.get('/currentuser', userController.currentuser);
routes.get('/currentUserProjects',passport.authenticate('jwt', { session: false }), (req, res) => {
    return userController.currentUserProjects;
});
 
module.exports = routes;