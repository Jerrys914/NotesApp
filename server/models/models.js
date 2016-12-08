var db = require('../../db');
//var bcrypt = require('bcrypt');


// All functions will be called in controllers.js file
module.exports = {
  notes: {
    getAll: function(userId, callback) { // takes userId
      var queryString = 'SELECT * FROM Notes WHERE id_Users = ?'; // return all notes for that userId passed in
      db.query(queryString, userId, function(err, results) { // results = array containing all notes as objects 
        console.log('GETALL: id', userId)
        console.log('Getting All Notes For User: ', results);
        callback(err, results); // run callback on results
      });
    },
    getPublic: function(userId, callback) {
      var queryString = "SELECT * FROM Notes WHERE id_Users = ? AND isPrivate = 'false';"; // returns all notes for Searched user id passed in
      db.query(queryString,userId, function(err, results) {                               // and where the isPrivate column in db is false
        console.log("GETTING ALL PUBLIC NOTES: ", results);
        callback(err, results); // run call back on results //results = array containing all notes as objects 
      });
    },
    post: function(params, callback) { // params = [noteName, isPrivate('true' || 'false'), nodeData]
      var queryString = 'INSERT INTO Notes(name, id_Users, isPrivate, data) VALUES (?, ?, ?, ?);';
      db.query(queryString, params, function(err, results) { // results = okpacket saying the note was posted
        console.log('TRYING TO POST NOTE: ', results);
        callback(err, results); // run callback on the packet
      });
    },
    delete: function(noteName, callback) {
      var queryString = 'DELETE FROM Notes WHERE name = ?;';
      db.query(queryString, noteName, function(err, results) {
        console.log('TRYING TO DELETE NOTE: ', noteName);
        callback(err, results);
      });
    },
    edit: function(params, callback) { // params = [noteData, nodeId] - must be in that order
      var queryString = 'UPDATE Notes SET data = ? WHERE id = ?;';
      db.query(queryString, params, function(err, results) {
        console.log('TRYING TO UPDATE NOTE: ');
        callback(err, results);
      })
    }
  },
  users: {
    getId: function(username, callback) { // takes username as parameter
      var queryString = 'SELECT id FROM Users WHERE username = ?;'; // return id from user that = passed in username
      db.query(queryString,username,function(err, results) { // results = array containin obj with id property.. id = userId
        console.log('GETTING USER ' + username + "'s ID", results);
        callback(err, results); // run callback on the results array
      });
    },
    // used to see if user is in database on signin
    getUser: function(params, callback) { // params = [username, password] - must be in that order
      console.log("WHERE HERE IN THE getUser MODELS.JS!!!")
      var queryString = 'SELECT * FROM Users WHERE username = ? AND password = ?;';
      db.query(queryString,params, function(err,results) { // if successful results = that users db info in an object
        console.log('GETTING USER: ', params[0]);
        callback(err, results); // run callback on the results
      });
    } 
  }
};