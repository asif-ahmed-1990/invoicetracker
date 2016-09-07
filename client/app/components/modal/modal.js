function modalDialogue($scope,$mdDialog,item) {
	$scope.item = item;
	$scope.cancel = function(){
		$mdDialog.hide();
	}
}

angular.module('invoiceTrackerApp').directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
});