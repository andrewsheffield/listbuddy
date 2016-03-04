app.factory('loginFactory', function($http){
  var factory = {};

  var baseURL = '/api/v1/';

  factory.attemptLogin = function(data){
  	return $http.post(baseURL+"user/login", data);
  };

  return factory;
});


app.controller('loginController', function($scope, $location, loginFactory, AuthService) {
	
	$scope.failedAuth = false;
	$scope.failedSignup = false;
	$scope.passwordMismatch = false;
	$scope.loginData = {};
	//$scope.signup = {};

  AuthService.checkForAuth()
    .success(function(user) {
      $location.path('/dash');
    })
    .error(function(err) {
      console.log(err);
    });

	$scope.attemptLogin = function() {
		$scope.loginLoading = true;
		loginFactory.attemptLogin($scope.loginData)
			.success(function(user) {
				$location.path('/dash');
				$scope.loginLoading = false;
			})
			.error(function(err) {
				$scope.failedAuth = true;
				$scope.loginLoading = false;
				console.log(err);
			});
	}

});