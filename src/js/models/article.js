var app = app || {};
app.article = (function () {

    "use strict";
    function articleCreate(article) {
        var def = Q.defer();
        var _this = {};
        _this.title = article.title;
        _this.titleColor = article.titleColor;
        _this.content = article.content;
        _this.contentSummery = article.content.length > 100 ? article.content.slice(0, 100) : article.content;
        _this.tags = article.tags.trim().toLowerCase().split(/[\s+|,]+/);
        _this.tags = _this.tags.filter(function (x) {
            return x;
        });
        article.title.trim().toLowerCase().split(/\s+/).forEach(function (e) {
            _this.tags.push(e);
        });
        _this.tags = _this.tags.unique();
        _this.rating = article.rating ? article.rating : 0;
        if (!article.imageSrc && !article.image) {
            def.resolve(_this);
        } else {
            if (article.imageSrc) {
                _this.imageSrc = article.imageSrc;
            } else {
                base64(article.image).then(function (success) {
                    _this.imageBase64 = success.base64;
                }, function (e) {
                    def.reject(e);
                    console.error(e);
                }).done();
            }
            def.resolve(_this);
        }

        return def.promise;
    }

    function base64(file, callback) {
        var defer = Q.defer();

        var base64, reader, resultFile = {};

        function readerOnLoad(e) {
            base64 = btoa(e.target.result);
            resultFile.base64 = base64;
            defer.resolve(resultFile);
        }

        reader = new FileReader();
        reader.onload = readerOnLoad;
        //
        //resultFile.filetype = file.type;
        //resultFile.size = file.size;
        //resultFile.filename = file.name;
        reader.readAsBinaryString(file);

        return defer.promise;
    }

    Array.prototype.unique = function () {
        var o = {}, i, l = this.length, r = [];
        for (i = 0; i < l; i += 1) o[this[i]] = this[i];
        for (i in o) r.push(o[i]);
        return r;
    };

    return {
        get: function (articleObj) {
            return articleCreate(articleObj);
        }
    }
}());