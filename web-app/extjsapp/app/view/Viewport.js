
Ext.define('GR06.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'GR06.view.MainTabPanel'
    ],

    id: 'MainViewport',
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
                    padding: 5,
                    layout: {
                        align: 'stretch',
                        type: 'hbox'
                    },
                    items: [
                        {
                            xtype: 'container',
                            html: '<a href="/"><img src="/images/logo.png"></a>',
                            flex: 1
                        },
                        {
                            xtype: 'container',
                            autoLoad: { url:'/campaignManagement/showHeaderLogin', scripts:true },
                            flex: 1,
                            style: 'text-align:right'
                        }
                    ]
                },
                {
                    xtype: 'mainTabPanel',
                    flex: 1
                },
                {
                    xtype: 'container',
                    html: '  <div style="float:left">Copyright (C) 2012 Jeff Risberg</div>\n',
                    id: 'FooterContainer',
                    padding: 5,
                    style: 'color: #808080'
                }
            ]
        });

        me.callParent(arguments);
    }

});