var app = app || {};

app.loginView = (function () {
    function loginView(selector) {
        $(selector).empty();

        $.get('templates/login.html', function (template) {
            var output = Mustache.render(template);
            $(selector).append(output);

            $('#login-btn').click(function () {
                var data = {
                    username: $('#login-username').val(),
                    password: $('#login-password').val()
                };
                Sammy(function () {
                    this.trigger('login-event', data);
                });
            });
        });


        //$(selector).css('width', '200px');
    }

    return {
        load: function (selector) {
            return loginView(selector);
        }
    }
}());