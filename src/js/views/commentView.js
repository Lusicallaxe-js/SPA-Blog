var app = app || {};

app.commentView = (function () {
    "use strict";
    function commentView(selector, commentData) {
        selector.find('*').not('button').remove();

        if ($('#delete-article').length) {
            commentData.isAdmin = true;
        }

        $.get('src/templates/comment.html', function (template) {
            var output = Mustache.render(template, commentData);
            selector.append(output);

            $('.delete-comment-btn').click(function () {
                var id = $(this).closest('div').hide('slow').attr('data-id');
                Sammy(function () {
                    this.trigger('delete-comment-event', {commentId: id});
                });
            });
        });

    }

    return {
        load: function (selector, data) {
            return commentView(selector, data);
        }
    }
}());