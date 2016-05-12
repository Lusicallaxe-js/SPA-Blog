var app = app || {};

app.menuController = (function () {
    "use strict";
    var _this;

    function MenuController(model) {
        this.model = model;
        _this = this;
    }

    MenuController.prototype.loadMenu = function (selector) {
        app.menuView.load(selector);
        if (sessionStorage['isAdmin']) {
            addAdminNav();
        }
    };

    MenuController.prototype.search = function (tags) {
        var input = tags
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .map(encodeURIComponent);

        var query = '?query={"tags":{"$in":' + JSON.stringify(input) + '}}';
        var url = 'articles' + query;
        _this.model.getArticles(url)
            .then(function (success) {
                if (success.length) {
                    app.searchResultView.load('#articles', {articles: success});
                } else {
                    notie.alert(4, 'No Results Found', 1.5);
                }
            }, function (error) {
                console.log(error);
            }).done();
    };

    function addAdminNav() {
        $('#nav-login').find('> a:contains(Login)').text('Logout').attr('href', '#/logout');
        $('#nav-menu').append('<li id="nav-authors"><a href="#/create-article">Create Article</a></li>');
    }

    Sammy(function () {
        this.bind('search-event', function (e, data) {
            this.redirect('#/search');
            _this.search(data.tagsToSearch);
        });

        this.bind('admin-event', function () {
            addAdminNav();
            this.redirect('#/');
        });
    });

    return {
        load: function (model) {
            return new MenuController(model);
        }
    }
}());