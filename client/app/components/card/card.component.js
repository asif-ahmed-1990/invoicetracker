'use strict';

class cardController{
	constructor(){
		this.amt=0;
		this.intr=0;
	}
}

angular.module('invoiceTrackerApp')
  .component('card', {
    templateUrl: 'app/components/card/card.html',
    controller: cardController,
    bindings: {
    	amt: '@',
    	intr: '@',
    	name: '@'
  	}
});
