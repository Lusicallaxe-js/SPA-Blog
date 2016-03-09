var app = app || {};

(function () {
    app.requester.config('kid_-ke8mBy-kZ', '1f03be196d7447e3a2a94b483c32061c');
    var userRequester = new app.UserRequester();
    var collectionRequester = new app.CollectionRequester('items');

    app.router = Sammy(function () {
        var selector = '#wrapper';

        this.get('#/', function () {
            app.homeView.load(selector);
        });

        this.get('#/login', function () {
            app.loginView.load(selector);
        });

        this.get('#/register', function () {
            app.registerView.load(selector);
        });

        this.get('#/about', function () {
            app.aboutView.load(selector);
        });
    });
    app.router.run('#/');
}());


//userRequester.signUp('jon','12345');
//$('#sign-up').click(function () {
//    userRequester.signUp('joaan', '12345');
//});

//$('#login').click(function () {
//    userRequester.login('jon', '12345');
//});
//
//$('#logout').click(function () {
//    userRequester.logout();
//});
//
//$('#getInfo').click(function () {
//    userRequester.getInfo();
//});
//
//var count = 0;
//$('#add').click(function () {
//    collectionRequester.add('item' + ++count);
//});
//$('#delete').click(function () {
//    collectionRequester.delete('item' + count--);
//});

//userRequester.getInfo();
//userRequester.logout();