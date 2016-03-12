var app = app || {};

app.createArticleView = (function () {
    var pictureFile;

    function createArticleView(selector) {
        $(selector).empty();

        $.get('templates/create-article.html', function (template) {
            var output = Mustache.render(template);
            $(selector).append(output);

            $('#upload-picture').change(function (e) {
                var files = e.target.files || e.dataTransfer.files;
                pictureFile = files[0];
            });

            $('#post-article').click(function () {
                Sammy(function () {
                    var article = {
                        title: $('#title').val(),
                        titleColor: $('#color').val(),
                        image: pictureFile,
                        imageSrc: $('#picture-src').val(),
                        content: $('#content').val(),
                        tags: $('#tags').val()
                    };
                    this.trigger('post-article-event', article);
                });
            });
        });
    }

    return {
        load: function (selector) {
            return createArticleView(selector);
        }
    }
}());