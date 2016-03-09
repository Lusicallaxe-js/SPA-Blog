var app = app || {};

app._articleModel = (function () {
    function Article(requester) {
        this._requester = requester;
        this._posts = {
            posts: []
        }
    }

    Article.prototype.getArticles = function (url) {
        var defer = Q.defer();

        this._requester.makeRequest('GET', url, null, true)
            .then(function (data) {
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    return {
        load: function (requester) {
            return new Article(requester);
        }
    }
}());