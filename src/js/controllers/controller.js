var app = app || {};

app.controller = (function () {
    var _this;

    function Controller(model) {
        this.model = model;
        _this = this;
    }


    Controller.prototype.getHomePage = function (selector) {
        this.model.articleModel.getArticles('articles')
            .then(function (articlesData) {
                app.homeView.load(selector, articlesData);
            })
    };

    Controller.prototype.getCreateArticlePage = function (selector) {
        app.createArticleView.load(selector);
    };

    Controller.prototype.createArticle = function (article) {
        app.createArticleView.load(selector);
    };

    Sammy(function () {
        this.bind('add-article-event', function (e, data) {
            this.redirect('#/create-article');
        });
        this.bind('post-article-event', function (e, data) {
            _this.model.articleModel.addArticle('articles',data);

        });
    });

    return {
        load: function (model) {
            return new Controller(model);
        }
    }
}());