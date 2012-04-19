Ext.define('GR06.view.business.SalesOrderPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.salesOrderPanel',

    requires: [
        'GR06.store.business.SalesOrderStore'
    ],
    
    title: 'Sales Orders',
    id: 'SalesOrderPanel',   
    layout: {
        align: 'stretch',
        padding: '',
        type: 'vbox'
    },
    padding: '',   
    bodyPadding: 5,    
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'label',                 
                    margin: '0 0 2 0',                   
                    text: 'Sales Order Section 1',
                    flex: 0
                },
                {
                    xtype: 'combobox',
                    id: 'SalesOrderBox',
                    queryMode: 'local',
                    size: 32,
                    editable: false,
                    displayField: 'dateDue',
                    forceSelection: true,
                    store: 'business.SalesOrderStore',
                    valueField: 'id',
                    flex: 1
                },
                {
                    xtype: 'label',
                    margin: '0 0 2 0',
                    text: 'Section 2',
                    flex: 0
                }
            ]
        });

        me.callParent(arguments);      
    }

});