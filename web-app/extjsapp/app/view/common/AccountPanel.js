Ext.define('GR06.view.common.AccountPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.accountPanel',    

    border: 0,
    id: 'AccountPanel',
    padding: '',
    width: 250,
    layout: {
        align: 'stretch',
        padding: '',
        type: 'vbox'
    },
    bodyPadding: 5,
    collapsible: true,
    hideCollapseTool: true,
    title: 'Accounts',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'label',
                    height: 15,
                    margin: '0 0 2 0',
                    width: 51,
                    text: 'Site',
                    flex: 0
                },
                {
                    xtype: 'combobox',
                    id: 'AccountComboBox',
                    queryMode: 'local',
                    size: 32,
                    editable: false,
                    displayField: 'url',
                    forceSelection: true,
                    store: 'common.AccountStore',
                    valueField: 'id',
                    flex: 0
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