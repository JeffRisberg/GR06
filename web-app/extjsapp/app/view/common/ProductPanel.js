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
    title: 'Product',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'label',                   
                    margin: '0 0 2 0',                 
                    text: 'Product',
                    flex: 0
                },
                {
                    xtype: 'combobox',
                    id: 'ProductComboBox',
                    queryMode: 'local',
                    size: 32,
                    editable: false,
                    displayField: 'name',
                    forceSelection: true,
                    store: 'common.ProductStore',
                    valueField: 'id',
                    flex: 1
                },
                {
                    xtype: 'label',
                    margin: '0 0 2 0',
                    text: 'Text 2',
                    flex: 0
                }               
            ]
        });

        me.callParent(arguments);
    }

});