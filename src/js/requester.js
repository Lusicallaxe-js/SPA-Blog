var app = app || {};

app.requester = (function () {
    function Requester(appId, appSecret) {
        this.appId = appId;
        this.appSecret = appSecret;
        this.baseUrl = 'http://baas.kinvey.com/';
    }

    Requester.prototype.makeRequest = function (method, url, dataObj, useSession) {
        var token,
            defer = Q.defer(),
            options = {
                method: method,
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(dataObj),
                success: function (data) {
                    $('<p>').text(JSON.stringify(data)).appendTo($('#respond')); //TODO: remove (Test purposes)
                    defer.resolve(data);
                },
                error: function (error) {
                    $('<p>').css('color', 'red').text(JSON.stringify(error.responseText)).appendTo($('#respond'));
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

    return {
        config: function (appId, appSecret) {
            app.requester = new Requester(appId, appSecret);
        }
    };
}());