var app = app || {};

app.aboutView = (function () {
    function AboutView(selector) {
        $(selector).empty();

        $(selector).append(
            $('<h1>').text('About'),
            $('<h3>').text('TODO: create templates'),
            $('<p>').text('About page!')
        );

    }

    return {
        load: function (selector) {
            return new AboutView(selector);
        }
    }
}());