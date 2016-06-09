(function () {
    'use strict';
    angular.module('wayDeliv').controller('solicitarEntregaController', solicitarEntregaController);

    solicitarEntregaController.$inject = ['$location', '$scope', '$rootScope'];

    function solicitarEntregaController($location, $scope, $rootScope) {
        var $this = this;

        $this.solicitarEntregador = solicitarEntregadorAction;
        $this.teste = 'Novo Teste';

        function solicitarEntregadorAction() {
            if ($rootScope.currentUser != null) {
                var data = {
                    cliente: $this.cliente,
                    destino: 'Rua A19, Bairro Amazonia',
                    tempo_percurso: '0:10',
                    km_percurso: '1,2',
                    preco: '10.20',
                    entregador: 'Lucas Cabral'
                };
                firebase.database().ref('entregas/275_pizzaria').push(data);
            } else {
                $scope.modalLogin.show();
            }
        }
    }
})();
