Ext.define('GR06.view.Main', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.Main',
    
    requires: [
        'GR06.view.MainTabPanel'
    ],

    id: 'Main',
    layout: { align: 'stretch', type: 'vbox' },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    height: 45,
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
                    xtype: 'container',
                    html: '<div style="float:left">Copyright (C) 2012 Jeff Risberg</div>\n',
                    id: 'FooterContainer',
                    padding: 5,
                    style: 'background: #8080FF; color: #333',
                    flex: 0
                }
            ]
        });

        me.callParent(arguments);
    }
});
