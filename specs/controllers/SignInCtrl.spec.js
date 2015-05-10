describe("SignInCtrl methods", function() {
    'use strict';

    var $rootScope, $scope, $location, $ionicLoading, $ionicHistory, $ionicPopup, Auth;

    beforeEach(function() {
        module('app');
    });


    beforeEach(inject(function (_$controller_, _$rootScope_, _$location_, _$ionicLoading_, _$ionicHistory_, _$ionicPopup_, _Auth_) {
        $scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        $location = _$location_;
        $ionicLoading = _$ionicLoading_;
        $ionicHistory = _$ionicHistory_;
        $ionicPopup = _$ionicPopup_;
        Auth = _Auth_;

        _$controller_('SignInCtrl',
            {
                $rootScope: _$rootScope_,
                $scope: $scope,
                $location: _$location_,
                $ionicLoading: _$ionicLoading_,
                $ionicHistory: _$ionicHistory_,
                $ionicPopup: _$ionicPopup_,
                Auth: _Auth_
            });
    }));



    it("should pass because everything is right", function(){
        $scope.item = {email: "luan@teste.com", password: "123"};
        var ret = $scope.validateItem();
        expect(ret).toBe(true);
    });

    it("should not pass because of email is empty", function(){
        $scope.item = {email: "", password: "123"};
        var ret = $scope.validateItem();
        expect(ret).toBe(false);
    });

    it("should not pass because of email is empty", function(){
        $scope.item = {email: "luan@teste.com", password: ""};
        var ret = $scope.validateItem();
        expect(ret).toBe(false);
    });

    it("should save because everything is ok", function(){
        $scope.item = {email: "luan@teste.com", password: "123"};
        spyOn(Auth, "signIn").and.returnValue({then: function(){
            $scope.signInAuthSuccess($scope.item);
        }});
        spyOn($ionicLoading, "show");
        spyOn($ionicLoading, "hide");
        var ret = $scope.validateItem();
        $scope.signIn();
        expect(ret).toBe(true);
        expect(Auth.signIn).toHaveBeenCalled();
        expect($ionicLoading.show).toHaveBeenCalled();
        expect($ionicLoading.hide).toHaveBeenCalled();
    });

    it("should redirect user to dashboard if he's logged", function () {
        $scope.item = {email: "luan@teste.com", password: "123mudar"};
        spyOn(Auth, "currentUser").and.returnValue({then:function(){

        }});
        spyOn($location, "path");
        spyOn($ionicHistory, "nextViewOptions");
        $scope.signIn();
        $scope.checkCurrentUser();
        expect(Auth.currentUser).toHaveBeenCalled();
        expect($location.path).toHaveBeenCalledWith("/app/dashboard");
        expect($ionicHistory.nextViewOptions).toHaveBeenCalledWith({disableBack: true});
    });

});