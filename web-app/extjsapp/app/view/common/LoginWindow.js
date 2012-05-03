Ext.define('GR06.view.common.LoginWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.loginWindow',

    id: 'LoginWindow',
    title: 'Login to GR06',
    msg: '',
    //iconCls: 'iv-lock-icon',
    modal: true, resizable: false, draggable: false, closable: false,
    width: 351, height: 200,
    bodyPadding: 10,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    height: 350,
                    bodyPadding: '3 5',
                    defaults: { allowBlank: false },

                    items: [
                        { xtype: 'text', html: this.msg, padding: '0 0 5 0', height: 22 },
                        {
                            xtype: 'textfield',
                            id: 'username',
                            name: 'username',
                            fieldLabel: 'Username',
                            labelPad: 15,
                            labelWidth: 70,
                            width: 300,
                            height: 25,
                            padding: '10 0',
                            emptyText: 'johndoe'
                        },
                        {
                            xtype: 'textfield',
                            id: 'password',
                            name: 'password',
                            inputType: 'password',
                            fieldLabel: 'Password',
                            labelPad: 15,
                            labelWidth: 70,
                            width: 300,
                            height: 25,
                            padding: '10 0'
                        },
                        { xtype: 'button', 
                          text: 'Login', 
                          id: 'signIn',
                          style: 'margin-left: 85px', 
                          margin: '0 0 10 0' }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});