'use strict';

(function() {

    class PortfolioComponent {
        constructor(InvoiceService,$mdDialog) {
            this.Inv = InvoiceService;
            this.getAllInv();
            this.$mdDialog = $mdDialog;
        }

        getAllInv() {
            this.Inv.getAllInvoices().then(angular.bind(this, function(res) {
                this.pdata = this.processInvoicesPortfolio(res);
               // console.log(res);
               // console.log(this.pdata);
            }));
        }

        $onInit() {
            this.slider = this.dashboard.slider;
        }

        searchJSON(tID){
            for (var i = this.pdata.length - 1; i >= 0; i--) {
                if(this.pdata[i].trackid == tID){
                    return this.pdata[i];
                    break;
                }
            };
        }


        showAdvanced(ev,trackID) {

            var val = this.searchJSON(trackID); 

          //  console.log(val);
            this.$mdDialog.show({
                templateUrl: '/app/components/modal/modal.html',
                targetEvent: ev,
                clickOutsideToClose:true,
                locals: { item: val },
                fullscreen: true, // Only for -xs, -sm breakpoints.,
                controller: modalDialogue
            })
        }

        processInvoicesPortfolio(inv) {
            var portfolios = [];
            var portfolioList = [];
           // console.log(inv.length);

            var count=0;
            for (var i = 0; i < inv.length; i++) {
                var details = [];
                //console.log(inv[i]);
                var start = moment(inv[i].MonthEnd);
                var end = moment(inv[i].InvoiceDate);
                var diff = moment.duration(start.diff(end)).asDays();

                if(((diff <= this.slider.maxValue)||(this.slider.maxValue == 180)) && (diff >= this.slider.minValue)){
                  //  console.log(portfolioList);
                    if (portfolioList.indexOf(inv[i].Portfolio) < 0) {
                    //portfolios.push(inv[i].Portfolio);
                    portfolioList.push(inv[i].Portfolio);
                    details.portfolio = inv[i].Portfolio;
                    details.Amount = inv[i].AmountDueInclVAT;
                    details.Interest = inv[i].Interest;
                    details.trackid = count++;
                    details.invoices = [];

                    details.invoices.push(inv[i]);
                    portfolios.push(details);
                } else {

                    for (var j = portfolios.length - 1; j >= 0; j--) {

                        if (portfolios[j].portfolio == inv[i].Portfolio) {
                            portfolios[j].Amount += inv[i].AmountDueInclVAT;
                            portfolios[j].Interest += inv[i].Interest;
                            portfolios[j].invoices.push(inv[i]);
                        }

                    }
                }
            }
        }


       // console.log(portfolios);

        return portfolios;

    }



        /*randomColor(){
      let hexArray = ['#00796B','#0097A7','#303F9F','#795548','#7E57C2','#e74c3c','#d35400'];
      return hexArray[Math.floor(Math.random() * hexArray.length)];
  }*/
}



angular.module('invoiceTrackerApp')
.component('portfolio', {
    templateUrl: 'app/dashboard/portfolio/portfolio.html',
    controller: PortfolioComponent,
    controllerAs: 'portfolioCtrl',
    require:
    {
        dashboard    :'^dashboard'
    }
});

})();

//Disables Collapse Animations
$(document).ready(function(){
    $(function() { $.support.transition = false; });
})