var app = app || {};

app.articleView = (function () {
    "use strict";
    function articleView(selector, data) {
        $(selector).empty();

        $.get('src/templates/article.html', function (template) {
            var output = Mustache.render(template, data);
            $(selector).append(output);

            var $email = $('#input-email');
            var $name = $('#input-name');
            var $content = $('#input-text');

            $('.add-comment').click(function () {
                var id = $(this).closest('article').attr('data-id');
                var element = $(this).closest('.comments');

                var content = $content.val();
                var name = $name.val();
                var email = $email.val();

                $content.val('');
                $name.val('');
                $email.val('');

                Sammy(function () {
                    this.trigger('add-comment-event', {
                        "$element": element,
                        "articleId": id,
                        "content": content,
                        "author": name,
                        "email": email
                    });
                });
            });

            $('.view-comments').click(function () {
                var id = $(this).closest('article').attr('data-id'),
                    element = $(this).closest('.comments');
                Sammy(function () {
                    this.trigger('view-comments-event', {"id": id, "$element": $(element)});
                });
            });

            if (data.isAdmin) {
                $('#delete-article').click(function () {
                    var id = $(this).closest('article').attr('data-id');
                    Sammy(function () {
                        this.trigger('delete-article-event', {"id": id});
                    });
                });
                $('#edit-article').click(function () {
                    var id = $(this).closest('article').attr('data-id');
                    Sammy(function () {
                        this.trigger('edit-article-event', {"id": id});
                    });
                })
            }
        });

        $(selector).css('width', '100%');

    }

    return {
        load: function (selector, data) {
            return articleView(selector, data);
        }
    }
}());