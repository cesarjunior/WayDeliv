angular.module('starter', ['ionic', 'starter.controllers'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    cordova.plugins.Keyboard.disableScroll(true);

                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                    .state('app', {
                        url: '/app',
                        abstract: true,
                        templateUrl: 'templates/menu.html',
                        controller: 'AppCtrl'
                    })
                    .state('app.andamento', {
                        url: '/andamento',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/andamento.html',
                                controller: 'PlaylistsCtrl'
                            }
                        }
                    })
                    .state('app.solicitarEntrega', {
                        url: '/solicitar-entrega',
                        views: {
                            'menuContent': {
                                templateUrl: 'templates/solicitarEntrega.html',
                                controller: 'PlaylistsCtrl'
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
            $urlRouterProvider.otherwise('/app/andamento');
        });
