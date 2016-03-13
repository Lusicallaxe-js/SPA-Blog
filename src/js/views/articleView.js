var app = app || {};

app.articleView = (function () {
    function articleView(selector, articlesData) {
        $(selector).empty();

        $.get('templates/article.html', function (template) {
            var output = Mustache.render(template, articlesData);
            $(selector).append(output);

            $('.add-comment').click(function () {
                var id = $(this).closest('article').attr('data-id');
                var element = $(this).closest('.comments');
                var content = prompt('Content');
                var name = prompt('name?');
                var email = prompt('email?');
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

            //$('#create-article-btn').click(function () {
            //    Sammy(function () {
            //        this.trigger('add-article-event');
            //    });
            //});
        });

        $(selector).css('width', '100%');

    }

    return {
        load: function (selector, data) {
            return articleView(selector, data);
        }
    }
}());