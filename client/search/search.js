angular.module('notes-app.search', [])
  .factory('searchUserNoteFactory', function($http) {
     return function postData(data) {
      // send request with data containing username entered from searchByUser.html
      return $http({
        method:'POST',
        url:"api/searchNoteByUser",
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
    }).then(function(response) {
       // console.log('RESPONSE: ', response.data);
        data.notes = response.data;
        data.username = ''; // clear the username input box on searchByUser.html
        return response;
    })
    }
  })
  .controller('searchUserNoteCtrl',function($scope, $http, searchUserNoteFactory) {
    var sendData = function() { // sendData calls the function that searchUserNoteFactory returns
      searchUserNoteFactory($scope.data).then(function(resp){
        $scope.data.notes = resp.data; //when the data comes back attach it to the $scope
      });
    };
    $scope.data = {};
    $scope.data.sendData = sendData;  // attach sendData to the $scope
  });