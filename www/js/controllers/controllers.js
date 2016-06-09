(function () {
    'use strict';
    angular.module('wayDeliv')
            .controller('AppCtrl', AppCtrl)
            .controller('PlaylistsCtrl', PlaylistsCtrl)
            .controller('PlaylistCtrl', function ($scope, $stateParams) {
            });

    AppCtrl.$inject = ['$scope', '$rootScope', '$ionicModal', '$timeout'];
    function AppCtrl($scope, $rootScope, $ionicModal, $timeout) {

        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:;;;
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modalLogin = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modalLogin.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modalLogin.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = loginAction;
        function loginAction() {
            var userName = $scope.loginData.username;
            var userPassword = $scope.loginData.password;
            firebase.auth().signInWithEmailAndPassword(userName, userPassword)
                    .then(function (data) {
                        $rootScope.currentUser = {
                            uid: data.uid,
                            displayName: data.displayName,
                            email: data.email,
                            photoUrl: data.photoURL
                        };
                        $scope.modalLogin.hide();
                        // Limpa o formulario.
                        $scope.loginData.username = '';
                        $scope.loginData.password = '';
                    }, function (error) {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorMessage);
                    });
        }
    }

    PlaylistsCtrl.inject = ['$scope'];
    function PlaylistsCtrl($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
        //firebase.database().ref('entregas/275_pizzaria/').orderByKey().on('value', function (snapshot) {
        //console.log(snapshot.val());
        //});
    }

})();