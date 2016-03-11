var app = app || {};

app.model = function () {
    function Model(requester) {
        this.articleModel = app._articleModel.load(requester);
        this.userModel = app._userModel.load(requester);
    }

    return {
        loadModels: function (requester) {
            return new Model(requester);
        }
    }
}();