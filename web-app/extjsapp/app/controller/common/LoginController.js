/**
 * Common code for the login window
 */
Ext.define('GR06.controller.common.LoginController', {
    extend: 'Ext.app.Controller',

    refs: [
        { ref: 'loginWindow', selector: 'loginWindow' },
        { ref: 'loginLogoContainer', selector: 'loginWindow container' },
        { ref: 'loginForm', selector: 'loginWindow form' },
        { ref: 'loginUserNameField', selector: 'loginWindow textfield' },
        { ref: 'loginButton', selector: 'loginWindow button' }
    ],

    init: function() {
        this.control({
            'loginWindow form' : {
                afterrender: this.onFormAfterRender
            },
            'loginWindow button' : {
                click: this.onLoginButtonClick
            }
        });
    },

    onFormAfterRender: function() {
        var form = this.getLoginForm();
        form.keyNav = Ext.create('Ext.util.KeyNav', form.el, {
            enter: { fn: this.onLoginButtonClick, scope: this},
            scope: form
        });
    },

    onLoginButtonClick: function() {
        var me = this;
        var loginWindow = this.getLoginWindow();

        var form = this.getLoginForm().getForm();
        if (form.isValid()) {
            form.submit({
                url: '/auth/extSignIn',
                success: function(close, action) {
                    loginWindow.close();

                    // fire application level event
                    me.application.fireEvent('loginSuccessful', action.result.username);
                },

                failure: function(form, action) {
                    me.application.fireEvent('loginFailed');

                    var el = me.getLoginForm().getEl();
                    if (!el.getById('loginErrorMsg')) {
                        loginWindow.setHeight(loginWindow.getHeight() + 35);

                        Ext.DomHelper.insertBefore(el, {
                            tag: 'div',
                            id: 'loginErrorMsg',
                            cls: 'iv-error-box',
                            html: action.result.message,
                            style: 'margin: 5px 5px 10px 5px'
                        });
                    }
                }
            });
        }
    }
});
