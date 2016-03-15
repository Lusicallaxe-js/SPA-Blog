var app = app || {};

app.menuController = (function () {
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
        var input = encodeURIComponent(tags)
            .trim()
            .toLowerCase()
            .split(/\s+/);

        var query = '?query={"tags":{"$in":' + JSON.stringify(input) + '}}';
        var url = 'articles' + query;
        _this.model.getArticles(url)
            .then(function (success) {
                if (success.length) {
                    app.searchResultView.load('#articles', {articles: success});
                } else {
                    poppy.pop('info', 'No Results Found', '');
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

        this.bind('admin-event', function (e, data) {
            addAdminNav();
        });
    });

    return {
        load: function (model) {
            return new MenuController(model);
        }
    }
}());