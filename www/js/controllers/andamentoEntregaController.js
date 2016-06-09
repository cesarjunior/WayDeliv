(function () {
    'use strict';
    angular.module('wayDeliv').controller('andamentoEntregaController', andamentoEntregaController);

    function andamentoEntregaController($scope) {
        var $this = this;
        $this.entregas = [];

        getEntregas();
        function getEntregas() {
            firebase.database().ref('entregas/275_pizzaria/').orderByKey().on('child_added', function (snapshot) {
                $this.entregas.push(snapshot.val());
                $scope.$apply();
            });
        }
    }
})();