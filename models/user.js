var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
  
var UserSchema = new mongoose.Schema({

  username:{
    type: String,
    unique: true,
    required: true,
    sparse:true
  },
  position:{
    type: String,
    unique: false,
    sparse:true,
    required: true
  },
  gender:{
    type: String,
    unique: false,
    sparse:true,
    required: true
  },
  phone:{
    type: String,
    unique: false,
    sparse:true,
    required: true
  },
  company:{
    type: String,
    unique: true,
    required: false,
    lowercase: true,
    sparse:true,
    trim: true
  },
  email: {
        type: String,
        unique: true,
        required: false,
        lowercase: true,
        sparse:true,
        trim: true
    },
  password: {
        type: String,
        required: true,
        sparse:true
    },
  createdAt: {type: Date, default: Date.now},
  picture: {type: String, default: 'male.png'}


});
 
UserSchema.pre('save',  function(next) {
    var user = this;
 
     if (!user.isModified('password')) return next();
 
     bcrypt.genSalt(10, function(err, salt) {
         if (err) return next(err);
 
         bcrypt.hash(user.password, salt, function(err, hash) {
             if (err) return next(err);
 
             user.password = hash;
             next();
         });
     });
});
 
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);