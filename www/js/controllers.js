angular.module('app.controllers', [])

.controller('AppCtrl', function($rootScope, $scope, $ionicModal, $timeout, $location, $ionicHistory, $ionicPopup, $ionicLoading, Auth) {

    // Initializing

    // About Modal
    $ionicModal.fromTemplateUrl('templates/about.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.aboutModal = modal;
    });

    $scope.openAbout = function() {
        $scope.aboutModal.show();
    };

    $scope.closeAbout = function() {
        $scope.aboutModal.hide();
    };

    $scope.signOut = function() {
        Parse.User.logOut();
        $ionicHistory.nextViewOptions({disableBack: true});
        $location.path("/app/sign-in");
    }
})
    .controller('SignInCtrl', function($scope, $location, $ionicLoading, $ionicHistory, $ionicPopup, Auth) {

        $scope.checkCurrentUser = function(){
            if(Auth.currentUser()) {
                openDashboard();
            }
        };
        $scope.checkCurrentUser();

        function openDashboard() {
            $ionicLoading.hide();
            $ionicHistory.nextViewOptions({disableBack: true});
            resetItem();
            $location.path("/app/dashboard");
        }

        function resetItem() {
            $scope.item = {email: "", password: ""};
        }

      resetItem();

      $scope.validateItem = function(){
          var item = $scope.item;
          var title = "Atenção...";
          var ret = false;

          if (!item.email || item.email.trim().length < 5){
              $ionicPopup.alert({
                  title: title,
                  template: "Informe um e-mail válido..."
              });
          }
          else if(item.password.trim() == ""){
              $ionicPopup.alert({
                  title: title,
                  template: "Informe a senha..."
              });
          }else{
              ret = true;
          }
          return ret;
      }

      $scope.signIn = function() {

          $scope.signInAuthSuccess = function(user) {
            openDashboard();
          };

          $scope.signInAuthError = function(user, error) {
            $ionicLoading.hide();

            $ionicPopup.alert({
              title: 'Atenção...',
              template: 'E-mail ou senha inválido(s)...'
            });
          };
        if($scope.validateItem()) {
            $ionicLoading.show({template: "Autenticando..."});
            Auth.signIn($scope.item.email, $scope.item.password).then($scope.signInAuthSuccess, $scope.signInAuthError);
        }
      }
    })
.controller("SignUpCtrl",function($scope,$location,$ionicLoading,$ionicHistory, $ionicPopup, Auth){

    $scope.item = {name:"", surname:"", email:"", password:"", password_confirmation:""};

    $scope.validateItem = function() {
        var item = $scope.item;
        var title = "Atenção...";
        var ret = false;
        if (item.email.trim() == "") {
            $ionicPopup.alert({
                title: title,
                template: 'E-mail não pode ser vazio...'
            });
        }
        else if (item.password.trim() == "") {
            $ionicPopup.alert({
                title: title,
                template: 'Senha não pode ser vazio...'
            });
        }
        else if (item.password_confirmation.trim() !== item.password.trim()) {
            $ionicPopup.alert({
                title: title,
                template: 'A confirmação de senha não é válida...'
            });
        }else{
            ret = true
        }
        return ret;
    };

    $scope.signUp = function(){

        $scope.signUpAuthSuccess = function(user){
            $ionicLoading.hide();
            $ionicHistory.nextViewOptions({disableBack: true});
            $location.path("/app/dashboard");
        };

        $scope.signUpAuthError = function(error){
            $ionicLoading.hide();
            console.log("Erro " + error.code + " " + error.message);
        };

        if ($scope.validateItem()) {
            $ionicLoading.show({template: "Signing Up..."});
            Auth.signUp($scope.item.email, $scope.item.password).then($scope.signUpAuthSuccess,$scope.signUpAuthError);
        }
    }
})
    .controller('DashboardCtrl', function($scope, $rootScope, $ionicLoading, $compile, $ionicModal, Maps) {
        $ionicLoading.show({template: 'Loading...'});
        $ionicLoading.hide();
    });