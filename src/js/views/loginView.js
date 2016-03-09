var app = app || {};

app.loginView = (function () {
    function LoginView(selector) {
        $(selector).empty();

        $(selector).append(
            $('<h1>').text('Login'),
            $('<h3>').text('TODO: create templates'),
            $('<p>').text('Login page!'),
            $('<input>')
        );


        $(selector).css('width', '200px');
    }

    return {
        load: function (selector) {
            return LoginView(selector);
        }
    }
}());