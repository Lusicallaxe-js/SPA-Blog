var app = app || {};

app.commentController = (function () {
    "use strict";
    var _this;

    function CommentController(model) {
        this.model = model;
        _this = this;
    }


    CommentController.prototype.getComments = function (element, id) {
        this.model.getComments('comments/?query={"article._id":"' + id + '"}')
            .then(function (articlesData) {
                app.commentView.load(element, articlesData);
            })
    };

    CommentController.prototype.deleteComment = function (id) {
        this.model.deleteComment('comments/' + id)
            .then(function (articlesData) {
                app.commentView.load(articlesData);
            })
    };

    CommentController.prototype.deleteAllArticleComments = function (articleId) {
        return this.model.deleteComment('comments/?query={"article._id":"' + articleId + '"}');
    };

    CommentController.prototype.addComment = function (comment) {
        if (validateComment(comment)) {
            var dataComment = {
                "content": comment.content,
                "author": comment.author,
                "email": comment.email,
                "article": {
                    "_type": 'KinveyRef',
                    "_id": comment.articleId,
                    "_collection": 'articles'
                }
            };
            this.model.addComment('comments', dataComment);
        }
    };


    Sammy(function () {

        this.bind('view-comments-event', function (e, data) {
            _this.getComments(data.$element, data.id)
        });

        this.bind('add-comment-event', function (e, data) {
            _this.addComment(data)
        });

        this.bind('delete-comment-event', function (e, data) {
            _this.deleteComment(data.commentId);
        });

        this.bind('delete-all-comments-event', function (e, data) {
            _this.deleteAllArticleComments(data.articleId);
        });
    });

    function validateComment(comment) {
        if (!comment.author) {
            notie.alert(3, 'Enter your name', 1.5);
            return false;
        }
        if (!comment.content) {
            notie.alert(3, 'Enter your comment', 1.5);
            return false;
        }
        return true;
    }

    return {
        load: function (model) {
            return new CommentController(model);
        }
    }
}());