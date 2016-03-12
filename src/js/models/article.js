var app = app || {};
app.article = (function () {

    function articleCreate(article) {
        var def = Q.defer();
        var _this = {};
        _this.title = article.title;
        _this.titleColor = article.titleColor;
        _this.content = article.content;
        _this.contentSummery = article.content.length > 100 ? article.content.slice(0, 100) : article.content;
        _this.tags = article.tags.toLowerCase().split(/[\s+|,]+/);
        _this.tags = _this.tags.filter(function (x) {
            return x;
        });
        _this.tags.push(article.title.toLowerCase());
        _this.rating = 0;
        if (!article.imageSrc && !article.image) {
            def.resolve(_this);
        } else {
            if (article.imageSrc) {
                _this.imageSrc = article.imageSrc;
            } else {
                base64(image).then(function (success) {
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

        resultFile.filetype = file.type;
        resultFile.size = file.size;
        resultFile.filename = file.name;
        reader.readAsBinaryString(file);

        return defer.promise;
    }

    return {
        get: function (title, titleColor, image, content, tags) {
            return articleCreate(title, titleColor, image, content, tags);
        }
    }
}());