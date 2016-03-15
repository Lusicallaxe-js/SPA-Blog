var app = app || {};

app.userController = (function () {
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
                    } else {
                        //SammyObj.redirect('#/');
                    }
                }, function (error) {
                    poppy.pop('error', 'Wrong username or password!', '');
                });
        }
        return false;
    };

    UserController.prototype.logout = function () {
        sessionStorage.clear();
        $('#nav-login').find('> a:contains(Logout)').text('Login').attr('href', '#/login');
        $('#nav-authors').remove();
    };

    Sammy(function () {
        var SammyObj;
        this.before('#/create-article', function () {
            SammyObj = this;
            _this.isAdmin()
                .then(function (s) {
                    if (!s.role) {
                        SammyObj.redirect('#/');
                    }
                }, function (error) {
                    SammyObj.redirect('#/');
                });
        });

        this.bind('login-event', function (e, data) {
            _this.login(data);
        });


    });

    function validateUser(data) {
        if (!data.username || data.username.length < 4) {
            poppy.pop('error', 'Invalid Username', '');
            return false;
        }
        if (!data.password || data.password.length < 4) {
            poppy.pop('error', 'Invalid Password', '');
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