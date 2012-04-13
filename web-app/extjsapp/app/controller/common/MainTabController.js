Ext.define('GR06.controller.common.MainTabController', {
    extend: 'Ext.app.Controller',

    init: function() {
        this.control({
            '#MainTabPanel': {
                tabchange: this.onTabChange
            }
        });
    },

    onTabChange: function(tabPanel, newCard, oldCard) {
        var itemId = newCard.getItemId();
        if ('HomePanel' == itemId) {
            window.location.href = '/';
        }
        else if ('ReportingPanel' == itemId) {
            window.location.href = '/reporting';
        }
        else if ('AdminPanel' == itemId) {
            window.location.href = '/adminHome';
        }
    }
});
