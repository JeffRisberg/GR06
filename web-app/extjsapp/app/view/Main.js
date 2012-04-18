
Ext.define('GR06.view.Main', {
    extend: 'Ext.container.Viewport',
    requires: [
        'GR06.view.MainTabPanel'
    ],

    id: 'Main',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    height: 50,
                    id: 'HeaderContainer',
                    padding: 0,
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'container',
                            html: '<a href="/GR06"><img src="images/logo.png"></a>',
                            flex: 1
                        },
                        {
                            xtype: 'container',
                            autoLoad: { url:'pageFramework/showHeader', scripts:true },
                            flex: 1                          
                        }
                    ]
                },
                {
                    xtype: 'mainTabPanel',
                    flex: 1
                },              
                {
                    xtype: 'combobox',
                    id: 'AccountComboBox',
                    queryMode: 'local',
                    size: 32,
                    editable: false,
                    displayField: 'name',
                    forceSelection: true,
                    store: 'common.AccountStore',
                    valueField: 'id',
                    flex: 0
                },                                           
                {
                    xtype: 'container',
                    html: '<div style="float:left">Copyright (C) 2012 Jeff Risberg</div>\n',
                    id: 'FooterContainer',
                    padding: 5,
                    style: 'color: #808080'
                }
            ]
        });

        me.callParent(arguments);
    }
});
