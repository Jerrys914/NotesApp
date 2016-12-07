angular.module('notes-app.notes', [])
  .controller('viewNotesCtrl', function($scope, $http) {
    $http({
      mothod: "GET",
      url: "api/notes"
    }).then(function success(response) {
      console.log('RESPONSE: ', response);
      $scope.data = response.data
    });
  })
  .factory('newNoteFactory', function($http) {
    return function postData(data) {
      $http({
          method:'POST',
          url:"api/createNote",
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
      }).then(function(response) {
          console.log('RESPONSE: ', response);
          data.noteName = '';
          data.noteData = '';
          return response;
      })
    }
  })
  .controller('newNoteCtrl',function($scope, $http, newNoteFactory) {
    var sendData = function(data) {
      newNoteFactory(data);
    };
    $scope.data = {};
    $scope.data.sendData = sendData;  
  })