(function () {
    'use strict';
    angular.module('wayDeliv', ['ionic', 'ion-google-place']).run(configRun);
    function configRun($ionicPlatform, $rootScope, APP_SETTINGS) {

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

        firebase.initializeApp(APP_SETTINGS.FIREBASE);
        var currentUser = firebase.auth().currentUser;
        $rootScope.currentUser = null;
        if ($rootScope.currentUser != null) {
            $rootScope.currentUser = {
                displayName: currentUser.displayName,
                email: currentUser.email,
                photoUrl: currentUser.photoURL,
                uid: currentUser.uid
            }
        }
    }
})();