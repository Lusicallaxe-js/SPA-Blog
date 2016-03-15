var app = app || {};

app._userModel = (function () {
    function User(requester) {
        this._requester = requester;
    }

    User.prototype.login = function (data) {
        var defer = Q.defer();
        var url = 'user/' + this._requester.appId + '/login';
        this._requester.makeRequest('POST', url, data)
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
        return this._requester.makeRequest('POST', url, {}, true);
    };

    User.prototype.isAdmin = function (id) {
        var data = {
            id: id
        };
        var url = 'rpc/' + this._requester.appId + '/custom/isAdmin';
        return this._requester.makeRequest('POST', url, data, true);

    };

    return {
        load: function (requester) {
            return new User(requester);
        }
    }
}());