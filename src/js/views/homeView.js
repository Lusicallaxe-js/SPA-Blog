var app = app || {};

app.homeView = (function () {
    "use strict";
    function homeView(selector, articlesData) {
        $(selector).empty();

        $.get('src/templates/home.html', function (template) {
            var output = Mustache.render(template, articlesData);
            $(selector).append(output);
            $(selector).append('<div style="width: 100%;-webkit-user-select: none; " id="paging"><a id="prev">« Back</a>' +
                '<a id="next">Next »</a></div>');

            $('#prev').click(function () {
                Sammy(function () {
                    this.trigger('previous-page-event');
                });
            });

            $('#next').click(function () {
                Sammy(function () {
                    this.trigger('next-page-event');
                });
            });
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