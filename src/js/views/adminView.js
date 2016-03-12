var app = app || {};

app.adminView = (function () {
    function adminView(selector, articlesData) {
        $(selector).empty();

        $.get('templates/admin.html', function (template) {
            var output = Mustache.render(template, articlesData);
            $(selector).append(output);

            $('#create-article-btn').click(function () {
                Sammy(function () {
                    this.trigger('add-article-event');
                });
            });
        });

        $(selector).css('width', '100%');
    }

    return {
        load: function (selector, data) {
            return adminView(selector, data);
        }
    }
}());