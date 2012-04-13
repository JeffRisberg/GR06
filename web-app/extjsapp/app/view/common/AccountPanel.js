Ext.define('GR06.view.common.AccountPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.accountPanel',
    requires: [
        'GR06.view.common.AccountPanel'
    ],

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
    title: 'Site / Category',

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
                    id: 'SiteComboBox',
                    queryMode: 'local',
                    size: 32,
                    editable: false,
                    displayField: 'url',
                    forceSelection: true,
                    store: 'common.SiteStore',
                    valueField: 'id',
                    flex: 0
                },
                {
                    xtype: 'label',
                    margin: '0 0 2 0',
                    text: 'Category',
                    flex: 0
                },
                {
                    xtype: 'catTreePanel',
                    id: 'CatTree',
                    store: 'common.CatTreeStore',
                    flex: 1                 
                }
            ]
        });

        me.callParent(arguments);
    }

});