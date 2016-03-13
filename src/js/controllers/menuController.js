var app = app || {};

app.menuController = (function () {
    var _this;

    function MenuController(model) {
        this.model = model;
        _this = this;
    }
    
    MenuController.prototype.loadSearch = function (selector) {
        app.menuView.load(selector);
    };

    Sammy(function () {
        var SammyObj;
        this.bind('search-event', function (e, data) {
            var query = '?query={"tags":{"$in":' + JSON.stringify(data.tagsToSearch) + '}}';
            var url = 'articles' + query;
            _this.model.getArticles(url)
                .then(function (success) {
                    app.homeView.load('#articles', success);
                }, function (error) {
                    console.log(error);
                }).done();
        });
    });

    return {
        load: function (model) {
            return new MenuController(model);
        }
    }
}());