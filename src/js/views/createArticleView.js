var app = app || {};

app.createArticleView = (function () {
    "use strict";
    var pictureFile;

    function createArticleView(selector, data) {
        $(selector).empty();

        $.get('src/templates/create-article.html', function (template) {
            var output = Mustache.render(template, data);
            $(selector).append(output);

            $('#upload-picture').change(function (e) {
                var files = e.target.files || e.dataTransfer.files;
                pictureFile = files[0];
            });

            function getArticleInfo() {
                return {
                    title: $('#title').val(),
                    titleColor: $('#color').val(),
                    image: pictureFile,
                    imageSrc: $('#picture-src').val(),
                    content: $('#content').val(),
                    tags: $('#tags').val()
                }
            }

            $('#post-article-btn').click(function () {
                Sammy(function () {
                    //var article = {
                    //    title: $('#title').val(),
                    //    titleColor: $('#color').val(),
                    //    image: pictureFile,
                    //    imageSrc: $('#picture-src').val(),
                    //    content: $('#content').val(),
                    //    tags: $('#tags').val()
                    //};
                    var article = getArticleInfo();
                    this.trigger('post-article-event', article);
                });
            });

            $('#edit-article-btn').click(function () {
                var articleId = this.getAttribute('data-id');
                Sammy(function () {
                    var article = getArticleInfo();
                    this.trigger('save-article-event', {article: article, id: articleId});
                });
            })
        });
    }

    return {
        load: function (selector, data) {
            return createArticleView(selector, data);
        }
    }
}());