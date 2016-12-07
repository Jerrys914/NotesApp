angular.module('notes-app.search', [])
  .factory('searchUserNoteFactory', function($http) {
     return function postData(data) {
      return $http({
        method:'POST',
        url:"api/searchNoteByUser",
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
    }).then(function(response) {
       // console.log('RESPONSE: ', response.data);
        // notes = response.data;
        data.notes = response.data;
        data.username = '';
        return response;
    })
    }
  })
  .controller('searchUserNoteCtrl',function($scope, $http, searchUserNoteFactory) {
    // var sendData = function(data) {
    var sendData = function() {
    //  console.log('searchUserNoteFactory.notes: ', searchUserNoteFactory.notes)
      searchUserNoteFactory($scope.data).then(function(resp){
        $scope.data.notes = resp.data;
       // console.log('inside promise ', $scope.data.notes)
      });
    };
    $scope.data = {};
    // $scope.data.notes = searchUserNoteFactory.notes;
    $scope.data.sendData = sendData;  
  });