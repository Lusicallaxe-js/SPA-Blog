var app = app || {};

app._userModel = (function () {
    function User(requester) {
        this._requester = requester;
    }


    User.prototype.isAdmin = function (id) {
        var defer = Q.defer();
        var data = {
            id: id
        };
        var url = 'rpc/' + this._requester.appId + '/custom/isAdmin';
        this._requester.makeRequest('POST', url, data, true)
            .then(function (role) {
                defer.resolve(role);
            }, function (error) {
                defer.reject(error);
            });

        return defer.promise;
    };

    return {
        load: function (requester) {
            return new User(requester);
        }
    }
}());