/**
 * Base class for all controllers, adding common handlers for login change, etc.
 */
Ext.define('GR06.controller.common.AbstractTopController', {
    extend: 'Ext.app.Controller',

    refs: [
        { ref: 'headerLogin', selector: 'HeaderContainer > HeaderLogin'
        },
    ],

    init: function() {
        this.application.on('loginSuccessful', this.onLoginSuccessful, this);
    },

    onLoginSuccessful: function() {
        //alert("change of login");
//        this.getHeaderLogin().getView().refresh();
    }
});