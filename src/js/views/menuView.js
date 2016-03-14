var app = app || {};

app.menuView = (function () {
    function menuView(selector) {

        $(selector).click(function (e) {
            var tagsToSearch = $('#search').val();

            if (tagsToSearch.length) {
                Sammy(function () {
                    this.trigger('search-event', {tagsToSearch: tagsToSearch});
                });
            }
        });
    }

    return {
        load: function (selector) {
            return menuView(selector);
        }
    }
}());