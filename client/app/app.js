angular.module('notes-app',['notes-app.notes', 'notes-app.auth','notes-app.search', 'ngRoute'])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/', { // when comes to index will render viewNotes.. must be signed in(valid token)
    templateUrl: '../notes/viewNotes.html',
    controller: 'viewNotesCtrl', // notes/notes.js
    authenticate: true
  })
  .when('/viewNotes', { // when comes to viewNotes will render viewNotes.. must be signed in(valid token)
    templateUrl: '../notes/viewNotes.html',
    controller: 'viewNotesCtrl', // notes/notes.js
    authenticate: true
  })
  .when('/createNote', { // when comes to createNotes will render viewNotes.. must be signed in(valid token)
    templateUrl: '../notes/createNote.html',
    controller: 'newNoteCtrl', // notes/notes.js
    authenticate: true
  })
  .when('/searchUser', { // when comes to searchUser will render searchByUser.. must be signed in(valid token)
    templateUrl: '../search/searchByUser.html',
    controller: 'searchUserNoteCtrl', // search/search.js
    authenticate: true
  })
  .when('/signin', {
    templateUrl: '../users/signin.html',
    controller: 'AuthController' // users/users.js
  })
  .when('/signup', {
    templateUrl: '../users/signup.html', 
    controller: 'AuthController' // users/users.js
  })
  .when('/signout', {
    authenticate: true
  })
  .otherwise({
    templateUrl: '../notes/viewNotes.html',
    controller: 'viewNotesCtrl', // notes/notes.js
    authenticate: true
  })
   $httpProvider.interceptors.push('AttachTokens'); // will attach token to the localStorage
})
.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.notes-app');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) { // handles the authentication where authentication: true above
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) { // isAuth -> (users/users.js)
      $location.path('/signin');
    }
  });
});

