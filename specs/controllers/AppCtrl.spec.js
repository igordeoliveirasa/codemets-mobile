// Fakes
//var ParseCategory = function(data){};
//var ParseSubcategory = function(data){};

describe("AppCtrl methods", function() {
    'use strict';

    var $controller, $rootScope, $scope, $ionicModal, $timeout, $location, $ionicHistory, $ionicViewService, $ionicPopup, $ionicLoading, Auth;

    beforeEach(function() {
        module('app');
    });



    beforeEach(inject(function (_$rootScope_, _$controller_, _$ionicModal_, _$timeout_, _$location_, _$ionicHistory_, _$ionicPopup_, _$ionicLoading_, _Auth_) {
        $scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        $ionicModal = _$ionicModal_;
        $timeout = _$timeout_;
        $location = _$location_;
        $ionicHistory = _$ionicHistory_;
        $ionicPopup = _$ionicPopup_;
        $ionicLoading = _$ionicLoading_;
        Auth = _Auth_;

        $controller = _$controller_('AppCtrl',
            {
                $scope: $scope,
                $rootScope: _$rootScope_,
                $ionicModal: _$ionicModal_,
                $timeout: _$timeout_,
                $location: _$location_,
                $ionicHistory: _$ionicHistory_,
                $ionicPopup: _$ionicPopup_,
                $ionicLoading: _$ionicLoading_,
                Auth: _Auth_
            });
    }));


    it("should open About modal", function () {
        $scope.aboutModal = {show:function(){}};
        spyOn($scope.aboutModal, "show");
        $scope.openAbout();
        expect($scope.aboutModal.show).toHaveBeenCalled();
    });

});