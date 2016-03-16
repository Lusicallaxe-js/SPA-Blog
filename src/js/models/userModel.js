var app = app || {};

app._userModel = (function () {
    "use strict";
    function User(requester) {
        this._requester = requester;
    }

    User.prototype.login = function (data) {
        var defer = Q.defer();
        var url = 'user/' + this._requester.appId + '/login';
        this._requester.post(url, data)
            .then(function (success) {
                sessionStorage['sessionAuth'] = success._kmd.authtoken;
                sessionStorage['id'] = success._id;
                defer.resolve(success);
            }, function (error) {
                defer.reject(error)
            });
        return defer.promise;
    };

    User.prototype.logout = function () {
        var url = 'user/' + this._requester.appId + '/_logout';
        return this._requester.post(url, {});
    };

    User.prototype.isAdmin = function (id) {
        var data = {
            id: id
        };
        var url = 'rpc/' + this._requester.appId + '/custom/isAdmin';
        return this._requester.post(url, data);

    };

    return {
        load: function (requester) {
            return new User(requester);
        }
    }
}());