var db = require('../../db');
//var bcrypt = require('bcrypt');

module.exports = {
  notes: {
    getAll: function(userId, callback) {
      var queryString = 'SELECT * FROM Notes WHERE id_Users = ?';
      db.query(queryString, userId, function(err, results) {
        console.log('GETALL: id', userId)
        console.log('Getting All Notes For User: ', results);
        callback(err, results);
      });
    },
    getPublic: function(userId, callback) {
      var queryString = "SELECT * FROM Notes WHERE id_Users = ? AND isPrivate = 'false';";
      db.query(queryString,userId, function(err, results) {
        console.log("GETTING ALL PUBLIC NOTES: ", results);
        callback(err, results);
      });
    },
    post: function(params, callback) {
      var queryString = 'INSERT INTO Notes(name, id_Users, isPrivate, data) VALUES (?, ?, ?, ?);';
      db.query(queryString, params, function(err, results) {
        console.log('TRYING TO POST NOTE');
        callback(err, results);
      });
    },
    delete: function(noteName, callback) {
      var queryString = 'DELETE FROM Notes WHERE name = ?;';
      db.query(queryString, noteName, function(err, results) {
        console.log('TRYING TO DELETE NOTE: ', noteName);
        callback(err, results);
      });
    },
    edit: function(params, callback) {
      var queryString = 'UPDATE Notes SET data = ? WHERE id = ?;';
      db.query(queryString, params, function(err, results) {
        console.log('TRYING TO UPDATE NOTE: ');
        callback(err, results);
      })
    }
  },
  users: {
    getId: function(username, callback) {
      var queryString = 'SELECT id FROM Users WHERE username = ?;';
      db.query(queryString,username,function(err, results) {
        console.log('GETTING USER ' + username + "'s ID", results);
        callback(err, results);
      });
    },
    getUser: function(params, callback) {
      console.log("WHERE HERE IN THE FINDONE MODELS.JS!!!")
      var queryString = 'SELECT * FROM Users WHERE username = ? AND password = ?;';
      db.query(queryString,params, function(err,results) {
        console.log('GETTING USER: ', params[0]);
        callback(err, results);
      });
    } 
  }
};