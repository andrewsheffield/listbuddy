(function() {
  "use strict";

  angular.module('ListBuddyApp')
    .service('DashboardService', DashboardService);

  function DashboardService(AuthService, $location) {
    var service = this;

    service.model = {
    	selectedList: {},
    	user: {}
    }

    var model = service.model;

    //Check for Auth
		(function() {
			AuthService.checkForAuth()
	      .success(function(data) {
	        if (data.id) {
	        	model.user = data;
	        } else {
	          $location.path('/');
	        }
	      })
	      .error(function(err) {
	        console.log(err);
	        $location.path('/');
	      });

		})();

		console.log("loaded db service")

  }

}());