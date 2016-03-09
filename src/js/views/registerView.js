var app = app || {};

app.registerView = (function () {
    function RegisterView(selector) {
        $(selector).empty();

        $(selector).append(
            $('<h1>').text('Register'),
            $('<h3>').text('TODO: create templates'),
            $('<p>').text('Register page!'),
            $('<button>').text('+')
        );


        $(selector).css('width', '200px');
    }

    return {
        load: function (selector) {
            return RegisterView(selector);
        }
    }
}());
