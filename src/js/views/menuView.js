var app = app || {};

app.menuView = (function () {
    function menuView(selector) {

        $(selector).click(function (e) {
            var tagsToSearch = $('#search').val();

            if (tagsToSearch.length) {
                var input = tagsToSearch
                    .trim()
                    .toLowerCase()
                    .split(/\s+/);

                Sammy(function () {
                    this.trigger('search-event', {tagsToSearch: input});
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