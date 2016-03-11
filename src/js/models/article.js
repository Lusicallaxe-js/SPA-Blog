var app = app || {};
app.article = (function () {

    function articleCreate(title, titleColor, image, imageSrc, content, tags) {
        var def = Q.defer();
        var _this = {};
        _this.title = title;
        _this.titleColor = titleColor;
        _this.tags = tags;
        _this.content = content;
        if (!imageSrc && !image) {
            def.resolve(_this);
        } else {
            if (imageSrc) {
                _this.imageSrc = imageSrc;
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
        //if (!imageSrc) {
        //    base64(image).then(function (success) {
        //        _this.imageBase64 = success.base64;
        //        //_this.title = title;
        //        //_this.titleColor = titleColor;
        //        //_this.tags = tags;
        //        //_this.content = content;
        //        def.resolve(_this);
        //    }, function (e) {
        //        def.reject(e);
        //        console.error(e);
        //    }).done();
        //} else {
        //    if (imageSrc) {
        //
        //    }
        //    def.resolve(_this);
        //}

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