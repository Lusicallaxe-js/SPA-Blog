var app = app || {};

app.Requester = (function () {
    "use strict";
    var baseUrl;
    function Requester(appId, appSecret) {
        this.appId = appId;
        this.appSecret = appSecret;
        baseUrl = 'https://baas.kinvey.com/';
    }

    Requester.prototype.get = function (url) {
        return makeRequest('GET', url, null);
    };

    Requester.prototype.post = function (url, data) {
        return makeRequest('POST', url, data);
    };

    Requester.prototype.put = function (url, data) {
        return makeRequest('PUT', url, data);
    };

    Requester.prototype.remove = function (url) {
        return makeRequest('DELETE', url, {});
    };

    function makeRequest(method, url, dataObj) {
        var token,
            defer = Q.defer(),
            options = {
                method: method,
                url: baseUrl + url,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + btoa('guest:1234')
                },
                data: JSON.stringify(dataObj) || undefined,
                success: function (data) {
                    defer.resolve(data);
                },
                error: function (error) {
                    defer.reject(error);
                }
            };

        //if (!useSession) {
        //    token =  'guest:1234';
        //    options.beforeSend = function (xhr) {
        //        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(token));
        //    };
        //token = this.appId + ':' + this.appSecret;
        //options.beforeSend = function (xhr) {
        //    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(token));
        //};
        //} else {
        //    token =  'guest:1234';
        //    options.beforeSend = function (xhr) {
        //        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(token));
        //    };
        //token = sessionStorage['sessionAuth'];
        //options.beforeSend = function (xhr) {
        //    xhr.setRequestHeader('Authorization', 'Kinvey ' + token);
        //};
        //}

        $.ajax(options);
        return defer.promise;
    }

    return Requester;
}());