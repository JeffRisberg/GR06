Ext.define('GR06.view.common.AccountPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.accountPanel',    

    requires: [
        'GR06.store.common.AccountStore'
    ],
    
    title: 'Accounts',
    id: 'AccountPanel',
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
                    margin: '0 0 2 0',                 
                    text: 'Account',
                    flex: 0
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
                    flex: 1
                },
                {
                    xtype: 'label',
                    margin: '0 0 2 0',
                    text: 'Account',
                    flex: 0
                }
            ]
        });

        me.callParent(arguments);
    }

});