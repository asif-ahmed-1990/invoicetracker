'use strict';

(function() {

    class OwnerComponent {
        constructor(InvoiceService,$mdDialog) {
            this.Inv = InvoiceService;
            this.getAllInv();
            this.$mdDialog = $mdDialog;
        }

        getAllInv() {
            this.Inv.getAllInvoices().then(angular.bind(this, function(res) {
                console.log(res);
                this.odata = this.processInvoicesOwner(res);
                console.log(this.odata);
            }));
        }
        $onInit() {
            this.slider = this.dashboard.slider;
        };

        searchJSON(tID){
            for (var i = this.odata.length - 1; i >= 0; i--) {
                if(this.odata[i].trackid == tID){
                    return this.odata[i];
                    break;
                }
            };
        }

        showAdvanced(ev,trackID) {

            var val = this.searchJSON(trackID); 

            console.log(val);
            this.$mdDialog.show({
                templateUrl: '/app/components/modal/modal.html',
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { item: val },
                fullscreen: true, // Only for -xs, -sm breakpoints.,
                controller: modalDialogue
            })
        }

        processInvoicesOwner(inv) {
            var owners = [];
            var ownerList = [];
            var count=0;


            for (var i = 0; i < inv.length; i++) {
                var details = [];

                var start = moment(inv[i].MonthEnd);
                var end = moment(inv[i].InvoiceDate);
                var diff = moment.duration(start.diff(end)).asDays();

                //console.log(inv[i]);
                if (((diff <= this.slider.maxValue) || (this.slider.maxValue == 180)) && (diff >= this.slider.minValue)) {
                    if (ownerList.indexOf(inv[i].COGOwner) < 0) {
                        
                        ownerList.push(inv[i].COGOwner);
                        details.COGOwner = inv[i].COGOwner;
                        details.Amount = inv[i].AmountDueInclVAT;
                        details.Interest = inv[i].Interest;
                        details.trackid = count++;
                        details.invoices = [];

                        details.invoices.push(inv[i]);
                        owners.push(details);
                    } else {

                        for (var j = owners.length - 1; j >= 0; j--) {

                            if (owners[j].COGOwner == inv[i].COGOwner) {
                                owners[j].Amount += inv[i].AmountDueInclVAT;
                                owners[j].Interest += inv[i].Interest;
                                owners[j].invoices.push(inv[i]);
                            }

                        }
                    }
                }
            }
            console.log(owners);
            return owners;
        }
    }

    angular.module('invoiceTrackerApp')
        .component('owner', {
            templateUrl: 'app/dashboard/owner/owner.html',
            controller: OwnerComponent,
            controllerAs: 'ownerCtrl',
            require: {
                dashboard: '^dashboard'
            }
        });


angular.module('invoiceTrackerApp').filter('firstName', function() {

  return function(name) {

        if(name.indexOf(',') < 0)
        {
            return name;
        }

        else{

        return name.substring(name.indexOf(',')+1);

        } 
  }
});

})();
