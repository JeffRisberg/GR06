Ext.define('GR06.view.common.SiteCategoryPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.siteCategoryPanel',
    requires: [
        'GR06.view.common.CatTreePanel'
    ],

    border: 0,
    id: 'SiteCategoryPanel',
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

                    /*id: 'CatTree',
                    store: 'common.CatTreeStore',
                    flex: 1,
                    rootVisible: false,
                    viewConfig: {
                        id: '',
                        itemId: 'CatTreeView'
                    },
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            itemId: 'CatTreeToolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'ExpandAllButton',
                                    text: 'Expand All'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'CollapseAllButton',
                                    text: 'Collapse All'
                                }
                            ]
                        }
                    ]*/
                }
            ]
        });

        me.callParent(arguments);
    }

});