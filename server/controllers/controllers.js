var db = require('../../db');
var models = require('../models/models.js');
var jwt = require('jwt-simple');

module.exports = {
  notes : {

    // function to return all the notes for the LOGGED IN user.
    getAll: function(req, res) {
      var token = req.headers['x-access-token'];  // check for token
      console.log('TOKEN!!!!!!!!!!!!!!!!!!: ', token)
      if (!token || token === undefined) { // if no token or token is undefined
        res.redirect('/signin');
      } else {
        var user = jwt.decode(token, 'secret');  //decode token returns username
        console.log("TOKEN USERNAME: ", user);
        models.users.getId(user, function(err, resultUser) { // call user model method to return id for LOGGED IN user(models.js)
          console.log('resultUser: ', resultUser); // resultUser comes back as array with one user object
          var id= resultUser[0].id; 
          models.notes.getAll(id, function(err, results) { // pass id into notes model getAll method(models.js)
            console.log('GET NOTES: CONTROLLER RESULTS: ', results); // results = array containing note objects
            res.send(results);
          });
        });
      }
    },
    // function to return an array of note objects for searched user
    getPublic:function(req, res) { 
      var userId;
      models.users.getId(req.body.username, function(err, results) { // results = array with one user object for searched user
        // console.log('line 78: ', results)
        userId = results[0].id; 
        models.notes.getPublic(userId, function(err, results) { // pass searched userId into note model getPublic
          console.log('USER ID: ', userId);
          console.log('GET NOTES: CONTROLLER RESULTS: ', results);
          res.send(results); // results = array containing all searched users PUBLIC notes
        }); 
      });
    },
    // function that will post notes to the database
    post: function(req, res) {
      var token = req.headers['x-access-token']; 
      if (!token) { // if no token
        res.send('No token');
      } else {
        var user = jwt.decode(token, 'secret'); // decode token returns LOGGED IN USER username
        console.log("TOKEN USERNAME: ", user);
        models.users.getId(user, function(err, resultUser) { // pass username into getId. returns array with one user object
          var id = resultUser[0].id; // access user object id value and set to var id
          if(!req.body.noteData) { // if no note data was sent 
            req.body.noteData = ''; // set note data to ''... some data must be in params
          }
          var params = [req.body.noteName, id, req.body.isPrivate, req.body.noteData]; // params will be passed into note model post fn
          models.notes.post(params, function(err, results) {
            if(err) { console.log("NOTE POSTING ERROR: ", err); }
              res.sendStatus(201);
          });
        })
      }
    },
    delete: function(req, res) {
      var noteName = req.noteName;
      models.notes.delete(noteName, function(err, results) {
        if(err) { console.log('ERROR DELETING NOTE: ', err); }
        res.send(results);
      });
    },
    // function to edit node data
    edit: function(req, res) {
      var params = [req.data, req.noteId]; // params must be data and note id
      models.notes.edit(params, function(err, results) { // calls note model edit fn passing in params
        if(err) { console.log('ERROR EDITING NOTE: ', err); }
        res.send(results);
      });
    }
  },
  users: {
    // function to sign in a user 
    signin: function(req, res) {
     // console.log('USER SIGNIN CONTROLLER REQ: ', req);
     var user = req.body.username; // username from http request
     var passwd = req.body.password; // password from http request
      var params = [user, passwd]; // params must be only username and password
      models.users.getUser(params, function(err, results) { // pass params into user model signin.. callback
        if(err) { console.log('ERROR USER SIGNIN CONTROLLER: ', err); }
        console.log('USERS CONTROLLER RESULTS: ', results);
        if(!results) { // if no user was returned invalid sign in
          console.log('Wrong Username or Password')
          res.redirect('/'); // will redirect to / that needs auth.. will be re-routed on front end back to signin
        } else {
          var token = jwt.encode(user, 'secret'); // create token with username and 'secret'
          console.log("TOKEN:  ", token)
          res.send({token: token}); // send back token
        }
      })
    } 

        // ----------- FOR AUTHENTICATION -----------
    // comparePassword: function(attemptedPassword) {
    //   bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    //     if(err) { 
    //       console.log("ERROR COMPARING PASSWD: ", err)
    //     } else {
    //       return isMatch;
    //     }
    //   });
    // },
    // hashPassword: function() {
    //   var cipher = Promise.promisify(bcrypt.hash);
    //   return cipher(this.get('password'), null, null).bind(this)
    //   .then(function(hash) {
    //     this.set('password', hash);
    //   });
    // }
  }
};
