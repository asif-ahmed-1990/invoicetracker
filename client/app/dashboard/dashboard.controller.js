'use strict';

(function() {

    class DashboardComponent {
        constructor(Auth, $state) {
            this.Auth = Auth;
            this.$state = $state;
            this.visibleFlag = false;
            this.slider = {
                minValue: 60,
                maxValue: 180,
                options: {
                    floor: 0,
                    ceil: 180
                }
            };
        }

        switchView(view) {
            this.$state.go(view);
        }

        reloadstate(){
            console.log(this.$state.current.name);
            this.$state.reload(this.$state.current.name);
        }
    }

    angular.module('invoiceTrackerApp')
        .component('dashboard', {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: DashboardComponent,
            controllerAs: 'dashboardCtrl'
        });

})();
