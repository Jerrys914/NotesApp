var router = require('express').Router();
var controllers = require('./controllers/controllers.js');
var path = require('path');
var utils = require('./utilities.js');

// a user will never hit this page.. gets rerouted on front end to /#/ which is equivelent to #viewNotes
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

router.get('/api/notes', controllers.notes.getAll);
router.post('/api/createNote', controllers.notes.post);
router.post('/api/searchNoteByUser', controllers.notes.getPublic);
router.post('/api/users/signin', controllers.users.signin);
router.post('api/edit', controllers.notes.edit);
// router.get('/*', function(req, res) {
//   res.redirect('#viewNotes');
// });


module.exports = router;