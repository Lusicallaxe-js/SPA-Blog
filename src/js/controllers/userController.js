var app = app || {};

app.userController = (function () {
    "use strict";
    var _this;

    function UserController(model) {
        this.model = model;
        _this = this;
    }


    UserController.prototype.getLoginPage = function (selector) {
        app.loginView.load(selector);
    };

    UserController.prototype.isAdmin = function () {
        return this.model.isAdmin(sessionStorage['id']);
    };

    UserController.prototype.login = function (data) {
        if (validateUser(data)) {
            this.model.login(data)
                .then(function (success) {
                    if (success.role) {
                        sessionStorage['isAdmin'] = true;
                        Sammy(function () {
                            this.trigger('admin-event');
                        });
                        window.location.replace('#/');
                    }
                }, function (error) {
                    notie.alert(3, 'Wrong username or password!', 1.5);
                });
        }
        return false;
    };

    UserController.prototype.logout = function () {
        sessionStorage.clear();
        $('#nav-login').find('> a:contains(Logout)').text('Login').attr('href', '#/login');
        $('#nav-authors').remove();
        window.location.replace('#/');
    };

    Sammy(function () {
        var SammyObj;
        this.before('#/create-article', function () {
            if (!sessionStorage['isAdmin']) return false;
            SammyObj = this;
            _this.isAdmin()
                .then(function (s) {
                    if (!s.role) {
                        SammyObj.redirect('#/');
                    }
                }).done();
        });

        this.bind('login-event', function (e, data) {
            _this.login(data);
        });


    });

    function validateUser(data) {
        if (!data.username || data.username.length < 4) {
            notie.alert(3, 'Invalid username!', 1.5);
            return false;
        }
        if (!data.password || data.password.length < 4) {
            notie.alert(3, 'Invalid password!', 1.5);
            return false;
        }
        return true;
    }

    return {
        load: function (model) {
            return new UserController(model);
        }
    }
}());