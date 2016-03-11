var app = app || {};

app.Requester = (function () {
    function Requester(appId, appSecret) {
        this.appId = appId;
        this.appSecret = appSecret;
        this.baseUrl = 'https://baas.kinvey.com/';
    }

    Requester.prototype.makeRequest = function (method, url, dataObj, useSession) {
        var token,
            defer = Q.defer(),
            options = {
                method: method,
                url: this.baseUrl + url,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(dataObj),
                success: function (data) {
                    defer.resolve(data);
                },
                error: function (error) {
                    defer.reject(error);
                }
            };

        if (!useSession) {
            token = this.appId + ':' + this.appSecret;
            options.beforeSend = function (xhr) {
                xhr.setRequestHeader('Authorization', 'Basic ' + btoa(token));
            };
        } else {
            token = sessionStorage['sessionAuth'];
            options.beforeSend = function (xhr) {
                xhr.setRequestHeader('Authorization', 'Kinvey ' + token);
            };
        }

        $.ajax(options);
        return defer.promise;
    };

    return Requester;
}());