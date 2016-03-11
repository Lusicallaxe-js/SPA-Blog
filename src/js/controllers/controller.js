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
        if (sessionStorage['id']) {
            this.model.userModel.isAdmin(sessionStorage['id'])
                .then(function (success) {
                    console.log(success);
                    app.createArticleView.load(selector);
                }, function (error) {
                    console.log('You do not have Administrator access!');
                    window.location.replace('#/');
                })
        } else {
            console.log('Yoy must login first!');
            window.location.replace('#/');
        }

    };

    Controller.prototype.getLoginPage = function (selector) {
        app.loginView.load(selector);
    };

    Sammy(function () {
        var SammyObj;                           //TODO:  window.location.replace('#/');

        this.bind('login-event', function (e, data) {
            SammyObj = this;
            if (validateUser(data)) {
                _this.model.userModel.login(data)
                    .then(function (s) {
                        SammyObj.redirect('#/');
                    }, function (e) {
                        poppy.pop('error', 'Wrong username or password!', '');
                        console.log(e);
                    })
            }
        });

        this.bind('add-article-event', function (e, data) {
            this.redirect('#/create-article');
        });

        this.bind('post-article-event', function (e, data) {
            SammyObj = this;
            validateArticle(data);
            _this.model.articleModel.addArticle('articles', data)
                .then(function (success) {
                    SammyObj.redirect('#/');
                }, function (error) {
                    console.error(error);
                })
        });
    });

    function validateArticle(article) {
        if (!article.title || !article.content) {
            throw new Error('Invalid title and content')
        }
    }

    function validateUser(data) {
        if (!data.username || data.username.length < 4) {
            poppy.pop('error', 'Invalid username', '');
            return false;
        }
        if (!data.password || data.password.length < 4) {
            poppy.pop('error', 'Invalid password', '');
            return false;
        }
        return true;
    }

    return {
        load: function (model) {
            return new Controller(model);
        }
    }
}());