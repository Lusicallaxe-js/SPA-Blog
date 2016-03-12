var app = app || {};

app.model = function () {
    function Model(requester) {
        this.articleModel = app._articleModel.load(requester);
        this.userModel = app._userModel.load(requester);
        this.commentModel = app._commentModel.load(requester);
    }

    return {
        loadModels: function (requester) {
            return new Model(requester);
        }
    }
}();