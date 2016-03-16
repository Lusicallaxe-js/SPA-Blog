var app = app || {};

app.menuView = (function () {
    "use strict";
    var $searchInput = $('#search');

    function menuView() {

        $('#search-btn').click(function () {
            var tagsToSearch = $searchInput.val();
            $searchInput.val('');
            if (tagsToSearch.length) {
                Sammy(function () {
                    this.trigger('search-event', {tagsToSearch: tagsToSearch});
                });
            }
        });

        $('#nav-logout').click(function () {
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