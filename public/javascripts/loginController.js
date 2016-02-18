app.factory('loginFactory', function($http){
  var factory = {};

  var baseURL = '/api/v1/';

  factory.attemptLogin = function(data){
  	return $http.post(baseURL+"user/login", data);
  };

  factory.checkForAuth = function() {
    var url = baseURL + "user/auth";
    return $http.get(url);
  }

  factory.attemptSignup = function (data) {
  	return $http.post(baseURL + "user/create", data);
  }

  return factory;
});


app.controller('loginController', function($scope, $location, loginFactory) {
	
	$scope.failedAuth = false;
	$scope.failedSignup = false;
	$scope.loginData = {};

	$scope.loading = 0;

	$scope.checkForAuth = function() {
    loginFactory.checkForAuth()
      .success(function(user) {
        $location.path('/dash');
      })
      .error(function(err) {
        console.log(err);
      });
  }();


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

	$scope.attemptSignup = function() {
		$scope.signupLoading = true;
		loginFactory.attemptSignup($scope.signup)
			.success(function(user) {
				$location.path('/dash');
				$scope.signupLoading = false;
			})
			.error(function(err) {
				console.log(err);
				$scope.failedSignup = true;
				$scope.signupLoading = false;
			});
	}

});