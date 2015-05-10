//trick
// made to pass at PhantomJS

describe("DashboardCtrl methods", function() {
    'use strict';

    var $rootScope, $scope, $ionicLoading, $compile, $ionicModal;

    beforeEach(function() {
        module('app');
    });


    beforeEach(inject(function (_$controller_, _$rootScope_, _$ionicLoading_, _$compile_, _$ionicModal_) {
        $scope = _$rootScope_.$new();
        $rootScope = _$rootScope_;
        $ionicLoading = _$ionicLoading_;
        $ionicModal = _$ionicModal_;
        $compile = _$compile_;


        _$controller_('DashboardCtrl',
            {
                $scope: $scope,
                $rootScope: _$rootScope_,
                $ionicModal: _$ionicModal_,
                $ionicLoading: _$ionicLoading_,
                $compile: _$compile_
            });
    }));

});