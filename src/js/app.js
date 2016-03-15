var app = app || {};
sessionStorage['sessionAuth'] = 'c80bf3ac-ba07-4ab9-bebe-5bd2e4cfb9c4.X4pj7hnkNWh9mVpKNsMb+8COSaZs3RlscSETlZnPlh8=';
(function () {
    var requester = new app.Requester('kid_-ke8mBy-kZ', '1f03be196d7447e3a2a94b483c32061c');
    var models = app.model.loadModels(requester);
    var userController = app.userController.load(models.userModel);
    var articleController = app.articleController.load(models.articleModel);
    var commentController = app.commentController.load(models.commentModel);
    var menuController = app.menuController.load(models.articleModel);

    menuController.loadMenu();


    app.router = Sammy(function () {
        var selector = '#articles';

        this.get('#/', function () {
            articleController.getArticlesPage(selector);
        });

        this.get('#/article/:id', function () {
            var id = this.params['id'];
            userController.isAdmin()
                .then(function (success) {
                    if (success.role) {
                        articleController.getArticleByIdPage(id, selector, true);
                    } else {
                        articleController.getArticleByIdPage(id, selector);
                    }
                }).done();
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

        this.get('#/search', function () {

        });
    });
    app.router.run('#/');
}());