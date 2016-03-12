var app = app || {};

app.commentView = (function () {
    function commentView(selector, commentData) {
        selector.empty();

        $.get('templates/comment.html', function (template) {
            var output = Mustache.render(template, commentData);
            selector.append(output);

            //$('#create-article-btn').click(function () {
            //    Sammy(function () {
            //        this.trigger('add-article-event');
            //    });
            //});
        });

        //$(selector).css('width', '100%');
    }

    return {
        load: function (selector, data) {
            return commentView(selector, data);
        }
    }
}());