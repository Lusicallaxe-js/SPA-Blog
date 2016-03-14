var app = app || {};
sessionStorage['sessionAuth'] = '0f0744cb-2c1c-49b8-bb1a-54ec662e993f.dEPvh5nJircwZ0+bOfJGltXYaRlRHWLw821nCqzYj5E=';
//sessionStorage['id'] = '56e28b1d27b937ca6f0824b4';
(function () {
    var requester = new app.Requester('kid_-ke8mBy-kZ', '1f03be196d7447e3a2a94b483c32061c');
    var models = app.model.loadModels(requester);
    var userController = app.userController.load(models.userModel);
    var articleController = app.articleController.load(models.articleModel);
    var commentController = app.commentController.load(models.commentModel);
    var menuController = app.menuController.load(models.articleModel);

    menuController.loadSearch('#search-btn');

    app.router = Sammy(function () {
        var selector = '#articles';

        this.get('#/', function () {
            //userController.isAdmin()
            //    .then(function (success) {
            //        articleController.getAdminPage(selector, true);
            //    }, function (error) {
            articleController.getAllArticlesPage(selector, false);
            //})
        });

        this.get('#/article/:id', function () {
            articleController.getArticleByIdPage(this.params['id'], selector);
        });

        this.get('#/tag/:tag', function () {
            menuController.search(this.params['tag']);
        });

        this.get('#/create-article', function () {
            articleController.getCreateArticlePage(selector);
        });

        this.get('#/login', function () {
            userController.getLoginPage(selector);
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