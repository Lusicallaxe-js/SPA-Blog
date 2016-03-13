var app = app || {};

app.homeView = (function () {
    function homeView(selector, articlesData) {
        $(selector).empty();

        $.get('templates/home.html', function (template) {
            var output = Mustache.render(template, articlesData);
            $(selector).append(output);
        });

        $(selector).css('width', '65%');
        $('article').css('width', '38%');
    }

    return {
        load: function (selector, data) {
            return homeView(selector, data);
        }
    }
}());