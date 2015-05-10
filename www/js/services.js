// Initializing
Parse.initialize("ypjNpoN4i8dpNyjBlxgTmPnqr9THw9Qfj7KG8Osh", "lciIF5nt6edcrlKe1WAFwtAonnnz7ETbRL6OtM0X");
//var ParseService = Parse.Object.extend("Service");
//var ParseAddress = Parse.Object.extend("Address");
//var ParseSubcategory = Parse.Object.extend("Subcategory");
//var ParseCategory = Parse.Object.extend("Category");


angular.module('app.services', [])

.factory('Auth', function() {
    var user = new Parse.User();
    return {
        signUp: function(email, password) {
            user.set("email", email);
            user.set("username", email);
            user.set("password", password);
            return user.signUp();
        },
        signIn: function(email, password) {
            return Parse.User.logIn(email, password);
        },
        signOut: function() {
            Parse.User.logOut();
        },
        currentUser: function() {
            return Parse.User.current();
        }
    };
});
//.factory('Service', function() {
//    return {
//        save:function(title, description, value, subcategoryId, addressId){
//            var service = new ParseService();
//            service.set("title", title);
//            service.set("description", description);
//            service.set("value", value);
//            service.set("subcategory", new ParseSubcategory({id:subcategoryId}));
//            service.set("address", new ParseAddress({id:addressId}));
//            var acl = new Parse.ACL(Parse.User.current());
//            acl.setPublicReadAccess(true);
//            service.setACL(acl);
//            return service.save();
//        },
//        all:function(){
//            var query = new Parse.Query(ParseService);
//            query.include("address");
//            return query.find();
//        },
//        where:function(key, value){
//            var query = new Parse.Query(ParseService);
//            query.include("address");
//            query.equalTo(key, value);
//            return query.find();
//        }
//    }
//})