'use strict';

(function() {

    class UploadComponent {

        constructor(InvoiceService, $mdToast, $q) {
            this.done = false;
            this.$q = $q;
            this.InvoiceService = InvoiceService;
            this.month = null;
            this.months = moment.months();
            this.$mdToast = $mdToast;
            this.moment = moment();
            this.uploading = false;
        }

        upload(file) {

            if (this.month == null) {
                this.$mdToast.show(
                    this.$mdToast.simple()
                    .textContent('Select Month for the Invoices')
                    .position('top right')
                    .hideDelay(3000)
                );

            } else {

                this.uploading = true;
                this.out;
                process_files(file, this.$q)
                .then(output => {
                    output.map(i => {
                        i.MonthEnd = this.moment.month(this.month).endOf('month').format('DD-MMM-YYYY').toUpperCase();
                        i.Portfolio = 'Unassigned';
                        if (i.COGOwner == "") { i.COGOwner = "Others"; }
                        return i;
                    });
                   // console.log(output);
                   this.out=output;
                    return this.InvoiceService.getAllInvoices(); 
                }).then(response => {
                    var oldInvoices = _.values(response);
                    var modifiedOldInvoices = _.keyBy(oldInvoices,'InvoiceNo');
                    var newInvoices=_.values(this.out);
                    var modifiedNewInvoices = _.keyBy(newInvoices,'InvoiceNo');
                    //TODO: Comparing records and Editing it.
                    for (var i = oldInvoices.length - 1; i >= 0; i--) {
                        //for (var j = modifiedInvoices.length - 1; j >= 0; j--) {
                            if(modifiedOldInvoices[newInvoices[i].InvoiceNo]){
                                
                                delete modifiedOldInvoices[newInvoices[i].InvoiceNo]; 
                            }
                            else{
                                modifiedOldInvoices;
                            }
                        //};
                    };

                    console.log(modifiedOldInvoices);


                    return this.InvoiceService.createNewInvoice(this.out);
                })
                .then(success => {
                    console.log("Success" + success);
                    this.done = true;
                });
            }
        }


    }

    angular.module('invoiceTrackerApp')
        .component('upload', {
            templateUrl: 'app/upload/upload.html',
            controller: UploadComponent,
            controllerAs: 'uploadCtrl',
            authenticate: true
        });

})();
