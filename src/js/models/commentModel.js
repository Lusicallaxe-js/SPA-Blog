var app = app || {};

app._commentModel = (function () {
    var _this = this;

    function CommentModel(requester) {
        this._requester = requester;
        this.collectionUrl = 'appdata/' + requester.appId + '/';
        _this = this;
    }

    CommentModel.prototype.getComments = function (query) {
        var defer = Q.defer();

        this._requester.get(this.collectionUrl + query)
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
        return this._requester.post(this.collectionUrl + urlCollection, comment)
    };

    CommentModel.prototype.deleteComment = function (urlCollectionAndId) {
        return this._requester.remove(this.collectionUrl + urlCollectionAndId)
    };

    return {
        load: function (requester) {
            return new CommentModel(requester);
        }
    }
}());