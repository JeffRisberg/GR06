Ext.define('GR06.view.common.ProductPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.productPanel',   

    requires: [
        'GR06.store.common.ProductStore'
    ],
    
    id: 'ProductPanel',
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

        Ext.applyIf(me, {
            items: [               
                {
                    xtype: 'grid',
                    columns: [        
                        { dataIndex: 'type', text: 'Type', align: 'left', width: 200 },
                        { dataIndex: 'name', text: 'Name', align: 'left', width: 200 },
                        { dataIndex: 'description', text: 'Description', align: 'left' },
                        { dataIndex: 'price', text: 'Price', align: 'right' }
                    ],
                    store: Ext.create('GR06.store.common.ProductStore'),
                    flex: 1
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