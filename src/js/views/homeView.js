var app = app || {};

app.homeView = (function () {
    function HomeView(selector, articlesData) {
        $(selector).empty();


        var fragment = $(document.createDocumentFragment());
        articlesData.forEach(function (art) {
            fragment.append($('<article>').text(art.title))
        });
        var articles = $('<main>')
            .attr('id', 'article-main')
            .css({'border': '1px solid'})
            .append($('<h2>').text('Articles: '))
            .append(fragment);

        $(selector).append(
            $('<h1>').text('Home'),
            $('<h3>').text('TODO: create templates'),
            $('<p>').text('home page!'),
            $('<button>').text('Create new article').attr('id', 'create-article-btn'),
            articles
        );

        $('#create-article-btn').click(function () {
            Sammy(function () {
                this.trigger('add-article-event');
            });
        });

        $(selector).css('width', '100%');
    }

    return {
        load: function (selector, data) {
            return HomeView(selector, data);
        }
    }
}());