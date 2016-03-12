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

    Sammy(function () {
        var SammyObj;
        var f = function () {
            return false;
        };
        this.before('#/create-article', function () {
            SammyObj = this;
            _this.isAdmin()
                .then(function (s) {
                }, function (e) {
                    SammyObj.redirect('#/');
                });
        });


        this.bind('login-event', function (e, data) {
            SammyObj = this;
            if (validateUser(data)) {
                _this.model.login(data)
                    .then(function (success) {
                        if (success.role) {
                            SammyObj.redirect('#/create-article');
                        } else {
                            SammyObj.redirect('#/');
                        }
                        //_this.isAdmin()
                        //    .then(function (s) {
                        //        SammyObj.redirect('#/cre');
                        //    }, function (e) {
                        //        poppy.pop('error', 'Access Denied.', '');
                        //    })
                    }, function (error) {
                        poppy.pop('error', 'Wrong username or password!', '');
                    });
            }
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