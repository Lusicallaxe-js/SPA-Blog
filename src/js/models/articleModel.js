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
        var defer = Q.defer();

        this._requester.makeRequest('GET', this.collectionUrl + query, null, true)
            .then(function (data) {
                var articlesData = {
                    articles: data
                };
                defer.resolve(articlesData);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    Article.prototype.addArticle = function (urlCollection, article) {
        var defer = Q.defer();
        app.article.get(article.title, article.titleColor, article.image, article.content, article.tags)
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