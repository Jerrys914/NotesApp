angular.module('notes-app.auth', [])
.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    console.log('SIGNING USER: ', user)
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      console.log('RESP:  USERS.JS: ', resp.data.token);
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    //console.log('localStorage',$window.localStorage.getItem('com.notes-app'));
    if($window.localStorage.getItem('com.notes-app') === undefined || !$window.localStorage.getItem('com.notes-app')) {
      console.log('not a user')
      signout();
      res.redirect('#signout')
    } 
    return !!$window.localStorage.getItem('com.notes-app');
  };

  var signout = function () {
    console.log('SIGNING OUT')
    $window.localStorage.removeItem('com.notes-app');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
})
.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
       // console.log("AUTHCTRL TOKEN: ", token)
        $window.localStorage.setItem('com.notes-app', token);
        $location.path('/viewNotes');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.notes-app', token);
        $location.path('/viewNotes');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.isAuth = Auth.isAuth;
  $scope.signout = Auth.signout;
});
