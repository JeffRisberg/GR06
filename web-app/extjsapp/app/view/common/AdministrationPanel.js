Ext.define('GR06.view.common.AdministrationPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.administrationPanel',   

    requires: [
        'GR06.store.common.ProductStore'
    ],
 
    title: 'Administration',   
    id: 'AdministrationPanel',
    layout: {
        align: 'stretch',
        padding: '',
        type: 'vbox'
    },
    border: 0,
    padding: '',   
    bodyPadding: 5,    
 
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'label',
                    height: 15,
                    margin: '0 0 2 0',
                    width: 51,
                    text: 'Section 1',
                    flex: 0
                },
                {
                    xtype: 'combobox',
                    id: 'ProductBox',
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
                    text: 'Section 2',
                    flex: 0
                }
            ]
        });

        me.callParent(arguments);
    }

});