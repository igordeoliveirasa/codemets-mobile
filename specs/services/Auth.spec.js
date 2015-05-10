describe("Auth", function() {
  'use strict';

  var $injector;
  var Auth;

  beforeEach(function() {angular.module('app');});


  beforeEach(function() {
    $injector = angular.injector([ 'app.services' ]);
    Auth = $injector.get( 'Auth' );
  });


  it("should contain an Auth service with right methods", function(){
    expect(Auth).not.toBeUndefined();
    expect(Auth.signUp).toBeDefined();
    expect(Auth.signIn).toBeDefined();
    expect(Auth.signOut).toBeDefined();
    expect(Auth.currentUser).toBeDefined();
  });

});