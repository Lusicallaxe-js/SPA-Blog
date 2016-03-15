var app = app || {};

app.commentController = (function () {
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
                app.commentView.load(element, articlesData);
            })
    };

    CommentController.prototype.addComment = function (comment) {

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
    });

    function validateArticle(article) {
        if (!article.title || !article.content) {
            throw new Error('Invalid title and content')
        }
    }

    return {
        load: function (model) {
            return new CommentController(model);
        }
    }
}());