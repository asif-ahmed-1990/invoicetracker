'use strict';

(function(){

class InvoiceComponent {
  constructor(InvoiceService,Auth,$stateParams,$mdToast) {
    this.invoiceId = $stateParams.invoiceId;
    this.Inv = InvoiceService
    this.getInv(this.invoiceId);
    this.isEditing=false;
    this.getCurrentUser = Auth.getCurrentUser();
    this.comment=null;
    this.$mdToast=$mdToast; 
  }

  getInv(invId) {
            this.Inv.getInvoiceById(invId).then(angular.bind(this, function(res) {
                this.invoice=res[0];
            }));
        }

  update(){
    this.Inv.updateInvoice(this.invoiceId,this.invoice).then(res =>{

      this.$mdToast.show(
                    this.$mdToast.simple()
                    .textContent('Invoice Updated')
                    .position('top right' )
                    .hideDelay(3000)
                );

      this.getInv(this.invoiceId);
    });
    
  }

  handleClick(){
    if(this.isEditing){
      this.update();
      this.isEditing = !this.isEditing;
    }
    else{
      this.isEditing = !this.isEditing;
    }
  }

  updateComment(){

    var remark = {};
    remark.name=this.getCurrentUser.name;
    remark.date=moment().toISOString();
    remark.comment=this.comment;
    this.invoice.Remarks.push(remark);
    this.Inv.updateInvoice(this.invoiceId,this.invoice).then(res =>{

      this.comment="";
      this.getInv(this.invoiceId);
      if(this.isEditing){
        this.isEditing=false;
      }
    });


  }
}

angular.module('invoiceTrackerApp')
  .component('invoice', {
    templateUrl: 'app/invoice/invoice.html',
    controller: InvoiceComponent,
    controllerAs: 'invoiceCtrl'
  });

})();


angular.module('invoiceTrackerApp')
    .filter('joinBy', function () {
        return function (input,delimiter) {
            return (input || []).join(delimiter || ',');
        };
    });