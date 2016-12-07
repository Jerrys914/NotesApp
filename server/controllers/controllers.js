var db = require('../../db');
var models = require('../models/models.js');
var jwt = require('jwt-simple');

module.exports = {
  notes : {
    getAll: function(req, res) {
      var token = req.headers['x-access-token'];
      console.log('TOKEN!!!!!!!!!!!!!!!!!!: ', token)
      if (!token || token === undefined) {
       // console.log("HERE!!!!!!!!!!!!!!!!!!!!")
        res.redirect('/signin');
      } else {
        var user = jwt.decode(token, 'secret');
        console.log("TOKEN USERNAME: ", user);
        models.users.getId(user, function(err, resultUser) {
          console.log('resultUser: ', resultUser)
          var id= resultUser[0].id;
          models.notes.getAll(id, function(err, results) {
            console.log('GET NOTES: CONTROLLER RESULTS: ', results);
            res.send(results);
        });
        })
        
      }
    },
    getPublic:function(req, res) {
      var userId;
      models.users.getId(req.body.username, function(err, results) {
        console.log('line 78: ', results)
        userId = results[0].id;
        models.notes.getPublic(userId, function(err, results) {
          console.log('USER ID: ', userId);
          console.log('GET NOTES: CONTROLLER RESULTS: ', results);
          res.send(results);
        }); 
      });
    },
    post: function(req, res) {var token = req.headers['x-access-token'];
      if (!token) {
        res.send('No token');
      } else {
        var user = jwt.decode(token, 'secret');
        console.log("TOKEN USERNAME: ", user);
        models.users.getId(user, function(err, resultUser) {
          var id = resultUser[0].id;
          if(!req.body.noteData) {
            req.body.noteData = '';
          }
          var params = [req.body.noteName, id, req.body.isPrivate, req.body.noteData];
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
    edit: function(req, res) {
      var params = [req.data, req.noteId];
      models.notes.edit(params, function(err, results) {
        if(err) { console.log('ERROR EDITING NOTE: ', err); }
        res.send(results);
      });
    }
  },
  users: {
    signin: function(req, res) {
     // console.log('USER SIGNIN CONTROLLER REQ: ', req);
     var user = req.body.username;
     var passwd = req.body.password
      var params = [user, passwd];
      models.users.getUser(params, function(err, results) {
        if(err) { console.log('ERROR USER SIGNIN CONTROLLER: ', err); }
        console.log('USERS CONTROLLER RESULTS: ', results);
        if(!results) {
          console.log('Wrong Username or Password')
          res.redirect('/');
        } else {
          var token = jwt.encode(user, 'secret');
          console.log("TOKEN:  ", token)
          res.send({token: token});
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
