var app = app || {};

app.articleController = (function () {
    "use strict";
    var _this,
        currentPage,
        isOver;

    function ArticleController(model) {
        this.model = model;
        _this = this;
        currentPage = 1;
    }


    ArticleController.prototype.getArticlesPage = function (selector) {
        this.model.getArticles('articles?query={}&limit=4&skip=' + (currentPage - 1) * 4)
            .then(function (data) {
                data.length < 4 ? isOver = true : isOver = false;
                var articlesData = {
                    articles: data
                };
                app.homeView.load(selector, articlesData);
            })
    };

    ArticleController.prototype.getLatestArticles = function (selector) {
        this.model.getArticles('articles?query={}&sort={"_kmd.ect":-1}')
            .then(function (data) {
                app.searchResultView.load(selector, {articles: data});
            })
    };

    ArticleController.prototype.getArticleByIdPage = function (id, selector, isAdmin) {
        this.model.getArticles('articles/' + id)
            .then(function (data) {
                var dataO = [];
                data.tags.forEach(function (tag) {
                    dataO.push({tag: tag});
                });
                data.tags = dataO;
                var articlesData = {
                    articles: data,
                    isAdmin: isAdmin
                };

                app.articleView.load(selector, articlesData);

            }).done();
    };

    ArticleController.prototype.getAdminPage = function (selector) {
        this.model.getArticles('articles')
            .then(function (articles) {
                app.adminView.load(selector, articles);
            })
    };

    ArticleController.prototype.deleteArticleById = function (id) {
        return this.model.deleteArticleById(id);
    };

    ArticleController.prototype.editArticleById = function (id, article) {
        return this.model.editArticle(id, article);
    };

    ArticleController.prototype.getCreateArticlePage = function (selector) {
        app.createArticleView.load(selector, {});
    };

    ArticleController.prototype.getEditArticlePage = function (selector, articleId) {
        this.model.getArticles('articles/' + articleId)
            .then(function (success) {
                app.createArticleView.load(selector, success);
            })
    };

    Sammy(function () {
        var SammyObj;

        this.bind('add-article-event', function () {
            this.redirect('#/create-article');
        });

        this.bind('next-page-event', function () {
            if (!isOver) {
                currentPage++;
                _this.getArticlesPage('#articles')
            }
        });

        this.bind('previous-page-event', function () {
            currentPage--;
            if (currentPage < 1) {
                currentPage = 1;
                return false;
            }
            _this.getArticlesPage('#articles')
        });

        this.bind('delete-article-event', function (e, data) {
            SammyObj = this;
            _this.deleteArticleById(data.id)
                .then(function (success) {
                    $('article').hide('slow');
                    SammyObj.trigger('delete-all-comments-event', {articleId: data.id});
                    SammyObj.redirect('#/');
                }).done();
        });

        this.bind('save-article-event', function (e, data) {
            SammyObj = this;
            _this.editArticleById(data.id, data.article)
                .then(function (success) {
                    SammyObj.redirect('#/');
                }).done();
        });

        this.bind('edit-article-event', function (e, data) {
            _this.getEditArticlePage('#articles', data.id);
        });

        this.bind('post-article-event', function (e, data) {
            SammyObj = this;
            if (data.title && data.content) {
                _this.model.addArticle('articles', data)
                    .then(function (success) {
                        SammyObj.redirect('#/');
                    }, function (error) {
                        console.error(error);
                    })
            } else {
                notie.alert(3, 'Invalid title or content', 1.5);
            }
        });
    });

    return {
        load: function (model) {
            return new ArticleController(model);
        }
    }
}());