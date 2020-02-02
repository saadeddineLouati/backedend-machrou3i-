var express     = require('express');
var bodyParser  = require('body-parser');
var passport	= require('passport');
var mongoose    = require('mongoose');
var config      = require('./config/config');
var port        = process.env.PORT || 5000; 
var cors        = require('cors');
var session = require('express-session');
var socket = require('socket.io');
let message = require('./models/message');


var app = express();
app.use(cors());
 
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// Use the passport package in our application
app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);
 
app.use(session({ secret: 'anything' }));
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});

// Demo Route (GET http://localhost:5000)
app.get('/', function(req, res) {
  return res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/messages/messages', passport.authenticate('jwt', { session: false }),(req, res)=>{
  let sent;
  let recieved
  message.find({
      sender: req.user._id
  })
  .then(messages => {
      sent=messages
      message.find({
          reciever: req.user._id
      })
      .then(messages => {
          recieved=messages
          res.send(sent.concat(recieved));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

app.post("/messages/newMessage",passport.authenticate('jwt', { session: false }), (req, res) =>{
  message.create({
      message: req.body.message,
      sender: req.user._id,
      reciever: req.body.reciever
  })
  .then(m => res.json(m))
  .catch(err => res.status(400).json({ "Error": err }))

})

app.post('/messages/chatwith', passport.authenticate('jwt', { session: false }),(req, res)=>{
  let sent;
  let recieved
  message.find({})
  .where('sender').equals(req.user._id)
  .where('reciever').equals(req.body._id)
  .populate('sender') 
  .populate('reciever') 
  .then(messages => {
      sent=messages
      message.find({})
      .where('reciever').equals(req.user._id)
      .where('sender').equals(req.body._id)
      .populate('sender') 
      .populate('reciever') 
      .then(messages => {
          recieved=messages
          res.send(sent.concat(recieved));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  })
  .catch(err => res.status(400).json('Error: ' + err));
});

 
var usersRoute = require('./routes/users');
var tasksRoute = require('./routes/tasks');
var tasksgroupsRoute = require('./routes/tasksgroups');
var projectsRoute = require('./routes/projects');
var teamsRoute = require('./routes/teams');
var conversationsRoute = require('./routes/conversation');
var dealssRoute = require('./routes/deals');
// var messagesRoute = require('./routes/messages');
var meetingsRoute = require('./routes/meetings');

app.use('/users', usersRoute);
app.use('/tasks', tasksRoute);
app.use('/tasksgroups', tasksgroupsRoute);
app.use('/projects', projectsRoute);
app.use('/teams', teamsRoute);
app.use('/conversations', conversationsRoute);
app.use('/deals', dealssRoute);
// app.use('/messages', messagesRoute);
app.use('/meetings', meetingsRoute);

 
mongoose.connect(config.db, { useNewUrlParser: true , useCreateIndex: true});
 
const connection = mongoose.connection;
 
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});
 
connection.on('error', (err) => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});
 
// Start the server
var server= app.listen(port);
var io = socket(server);
io.on('connection', (socket) => {
  console.log('made socket connection', socket.id);

  socket.on('set-nickname', (sender, reciever) => {
    socket.sender = sender;
    socket.reciever = reciever;
    // io.emit('users-changed', {user: nickname, event: 'joined'});    
  });

  socket.on('add-message', (message) => {
    io.emit('message', {
      message: message.message,
      sender: socket.sender,
      reciever: socket.reciever,
      createdAt: new Date(),
      seen:false
    });    
  });

  // // Handle chat event
  // socket.on('chat', function(data){
  //     // console.log(data);
  //     io.sockets.emit('chat', data);
  // });

  // // Handle typing event
  // socket.on('typing', function(data){
  //     socket.broadcast.emit('typing', data);
  // });

});
console.log('There will be dragons: http://localhost:' + port);