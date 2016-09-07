'use strict';


(function() {

function InvoiceServiceService($http,$q) {
	// AngularJS will instantiate a singleton by calling "new" on this function

	function calculateInterest(days){
		if (days<=60)
			{return 0;}
		else if((days>60) && (days <=90))
			{return 0.5;}
		else if((days>90) && (days <=180))
			{return 1.25;}
		else if (days>180)
			{return 3;}
	}

	function processInvoice(invoices){

		for (var i = 0; i < invoices.length; i++) {
			var MonthEnd = moment(invoices[i].MonthEnd);
			var InvoiceDate = moment(invoices[i].InvoiceDate);

			invoices[i].overdue = MonthEnd.diff(InvoiceDate,'days');
			invoices[i].IntRate = calculateInterest(invoices[i].overdue);
			invoices[i].Interest = (invoices[i].IntRate * invoices[i].AmountDueInclVAT)/100;
		}

		
		return invoices;
	}

	var invoice = {
		getAllInvoices(){
			var deferred = $q.defer();
			var inv;
			$http.get('/api/invoices/').then(function(res){
				inv=res.data;
				inv = processInvoice(inv);
				deferred.resolve(inv);
			},function(err){
				deferred.reject(err);
			});
			return deferred.promise;
		},
		getInvoiceById(id){
			var deferred = $q.defer();
			var inv;
			$http.get('/api/invoices/invoice/'+id).then(function(res){
				inv=res.data;
				inv = processInvoice(inv);
				deferred.resolve(inv);
			},function(err){
				deferred.reject(err);
			});
			return deferred.promise;
		},
		getInvoiceByEmployeeID(empId){
			return $http.get('/api/invoices/empid/'+empId);
		},
		getInvoiceByPortfolio(name){
			return $http.get('/api/invoices/portfolio/'+name);
		},
		createNewInvoice(params){
			return $http.post('/api/invoices/',params);
		},
		updateInvoice(id,params){
			return $http.put('/api/invoices/invoice/'+id,params);
		},
		deleteInvoice(id){
			return $http.delete('/api/invoices/'+id);
		}
	};

	return invoice;
}




angular.module('invoiceTrackerApp')
  .factory('InvoiceService', InvoiceServiceService);

})();
