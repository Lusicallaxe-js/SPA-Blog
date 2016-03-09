var app = app || {};

app.homeView = (function () {
    function HomeView(selector) {
        $(selector).empty();

        $(selector).append(
            $('<h1>').text('Home'),
            $('<h3>').text('TODO: create templates'),
            $('<p>').text('home page!')
        );


        $(selector).css('width', '100%');
    }
    return {
        load: function (selector) {
           return new HomeView(selector);
        }
    }
}());