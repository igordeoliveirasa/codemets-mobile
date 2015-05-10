describe("SignUpCtrl methods", function() {
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

        _$controller_('SignUpCtrl',
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
        $scope.item = {name: "Luan", surname: "Nunes", email: "luan@teste.com", password: "123", password_confirmation: "123"};
        var ret = $scope.validateItem();
        expect(ret).toBe(true);
        expect($scope.item.password).toEqual($scope.item.password_confirmation);
    });

    it("should not pass because of name is empty", function(){
        $scope.item = {name: "", surname: "Nunes", email: "luan@teste.com", password: "123", password_confirmation: "123"};
        spyOn($ionicPopup, "alert");
        var ret = $scope.validateItem();
        expect(ret).toBe(false);
        expect($ionicPopup.alert).toHaveBeenCalled();
    });

    it("should not pass because of surname is empty", function(){
        $scope.item = {name: "Luan", surname: "", email: "luan@teste.com", password: "123", password_confirmation: "123"};
        var ret = $scope.validateItem();
        expect(ret).toBe(false);
    });

    it("should not pass because of email is empty", function(){
        $scope.item = {name: "Luan", surname: "Nunes", email: "", password: "123", password_confirmation: "123"};
        spyOn($ionicPopup, "alert");
        var ret = $scope.validateItem();
        expect(ret).toBe(false);
        expect($ionicPopup.alert).toHaveBeenCalled();
    });

    it("should not pass because of password is empty", function(){
        $scope.item = {name: "Luan", surname: "Nunes", email: "luan@teste.com", password: "", password_confirmation: "123"};
        spyOn($ionicPopup, "alert");
        var ret = $scope.validateItem();
        expect(ret).toBe(false);
        expect($ionicPopup.alert).toHaveBeenCalled();
    });

    it("should not pass because of email is empty", function(){
        $scope.item = {name: "Luan", surname: "Nunes", email: "luan@teste.com", password: "123", password_confirmation: ""};
        spyOn($ionicPopup, "alert");
        var ret = $scope.validateItem();
        expect(ret).toBe(false);
        expect($ionicPopup.alert).toHaveBeenCalled();
    });

    it("should not pass because of password is not equal to password_confirmation", function(){
        $scope.item = {name: "Luan", surname: "Nunes", email: "luan@teste.com", password: "123", password_confirmation: "1234"};
        spyOn($ionicPopup, "alert");
        var ret = $scope.validateItem();
        expect(ret).toBe(false);
        expect($ionicPopup.alert).toHaveBeenCalled();
        expect($scope.item.password).not.toEqual($scope.item.password_confirmation);
    });

    it("should sign-up because everything is ok",function(){
        $scope.item = {name: "Luan", surname: "Nunes", email: "luan@teste.com", password: "123", password_confirmation: "123"};
        spyOn(Auth, "signUp").and.returnValue({then: function(){
            $scope.signUpAuthSuccess($scope.item);
        }})
        spyOn($ionicLoading, "show");
        var ret = $scope.validateItem();
        $scope.signUp();
        expect(ret).toBe(true);
        expect($ionicLoading.show).toHaveBeenCalled();
        expect(Auth.signUp).toHaveBeenCalled();
    });

});