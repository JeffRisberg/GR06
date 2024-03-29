Ext.define('GR06.view.business.ProductPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.productPanel',   

    requires: [
        'GR06.store.business.ProductStore'
    ],
      
    border: 0,
    padding: '',  
    layout: {
        align: 'stretch',
        padding: '',
        type: 'vbox'
    },
    bodyPadding: 5,   
    title: 'Products',

    initComponent: function() {
        var me = this;

        var myTpl = new Ext.XTemplate(
        '<tpl for=".">',
        '<div class="panel" style="margin: 10px; background: #eef; padding: 5px">',
        '  <div>{name}</div>',
        '  <div class="panelDescription">{description}</div>',
        '</div>',
        '</tpl>',        
        { compiled: true }
        ); 
        
        Ext.applyIf(me, {
            items: [               
                 {
                    xtype: 'dataview',
                    itemId: 'productView',
                    store: 'business.ProductStore',                   
                    tpl: myTpl,      
                    itemSelector: 'div.panel',    
                    flex: 1,                                      
                },
                {
                    xtype: 'label',
                    margin: '0 0 2 0',
                    text: 'Updated to 2011 data',
                    flex: 0
                }               
            ]
        });

        me.callParent(arguments);
    }
});