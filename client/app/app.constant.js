(function(angular, undefined) {
  angular.module("invoiceTrackerApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	]
})

;
})(angular);