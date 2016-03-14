var app = app || {};

app.menuView = (function () {
    function menuView() {

        $('#search-btn').click(function (e) {
            var tagsToSearch = $('#search').val();

            if (tagsToSearch.length) {
                Sammy(function () {
                    this.trigger('search-event', {tagsToSearch: tagsToSearch});
                });
            }
        });

        $('#nav-logout').click(function (e) {
            Sammy(function () {
                this.trigger('logout-event');
            });
        });
    }

    return {
        load: function () {
            return menuView();
        }
    }
}());