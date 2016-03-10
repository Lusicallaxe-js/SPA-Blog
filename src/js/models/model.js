var app = app || {};

app.model = function () {
    function Model(requester) {
        this.articleModel = app._articleModel.load(requester);
    }

    return {
        loadModels: function (requester) {
            return new Model(requester);
        }
    }
}();