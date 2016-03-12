var app = app || {};

app._commentModel = (function () {
    var _this = this;

    function CommentModel(requester) {
        this._requester = requester;
        this.collectionUrl = 'appdata/' + requester.appId + '/';
        this._posts = {
            posts: []
        };
        _this = this;
    }

    CommentModel.prototype.getComments = function (query) {
        var defer = Q.defer();

        this._requester.makeRequest('GET', this.collectionUrl + query, null, true)
            .then(function (data) {
                var commentsData = {
                    comments: data
                };
                defer.resolve(commentsData);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    CommentModel.prototype.addComment = function (urlCollection, comment) {

        return this._requester.makeRequest('POST', this.collectionUrl + urlCollection, comment, true)
    };

    return {
        load: function (requester) {
            return new CommentModel(requester);
        }
    }
}());