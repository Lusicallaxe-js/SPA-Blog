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
            return this.model.login(data);
        }
    };

    UserController.prototype.logout = function () {
        //this.model.logout()
        //    .then(function () {
        sessionStorage.clear();
        $('#nav-login').find('> a:contains(Logout)').text('Login').attr('href', '#/login');
        $('#nav-authors').hide();
        //sessionStorage['']
        //})
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
            SammyObj = this;
            _this.login(data)
                .then(function (success) {
                    if (success.role) {
                        SammyObj.redirect('#/create-article');
                        sessionStorage['isAdmin'] = true;
                        Sammy(function () {
                            this.trigger('admin-event');
                        })
                    } else {
                        SammyObj.redirect('#/');
                    }
                }, function (error) {
                    poppy.pop('error', 'Wrong username or password!', '');
                });
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