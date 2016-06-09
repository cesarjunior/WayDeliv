(function () {
    'use strict';
    angular.module('wayDeliv')
            .config(configRouter);

    function configRouter($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('app', {
                    url: '/app',
                    abstract: true,
                    templateUrl: 'templates/menu.html',
                    controller: 'AppCtrl'
                })
                .state('app.andamentoEntrega', {
                    url: '/andamento-entrega',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/andamentoEntrega.html',
                            controller: 'andamentoEntregaController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('app.solicitarEntrega', {
                    url: '/solicitar-entrega',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/solicitarEntrega.html',
                            controller: 'solicitarEntregaController',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('app.single', {
                    url: '/playlists/:playlistId',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/playlist.html',
                            controller: 'PlaylistCtrl'
                        }
                    }
                })
                .state('app.browse', {
                    url: '/browse',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/browse.html'
                        }
                    }
                });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/andamento-entrega');
    }
})();