var app = app || {};

app._articleModel = (function () {
    var _this = this;

    function Article(requester) {
        this._requester = requester;
        this.collectionUrl = 'appdata/' + requester.appId + '/';
        this._posts = {
            posts: []
        };
        _this = this;
    }

    Article.prototype.getArticles = function (query) {
        return this._requester.makeRequest('GET', this.collectionUrl + query, null, true);
    };

    Article.prototype.addArticle = function (urlCollection, article) {
        var defer = Q.defer();
        app.article.get(article)
            .then(function (articleData) {
                _this._requester.makeRequest('POST', _this.collectionUrl + urlCollection, articleData, true)
                    .then(function (data) {
                        defer.resolve(data);
                    }, function (error) {
                        defer.reject(error);
                    });
            });

        return defer.promise;
    };

    return {
        load: function (requester) {
            return new Article(requester);
        }
    }
}());