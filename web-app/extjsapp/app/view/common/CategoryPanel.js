/**
 * Provides a list of categories down the left side
 *
 * @author Jeff Risberg
 * @since April 2012
 */
Ext.define('GR06.view.common.CategoryPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.categoryPanel',
   
    width: 250,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    bodyPadding: 5,
    collapsible: true,
    hideCollapseTool: true,
    title: "Category",

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'label',
                    height: 15,
                    margin: '0 0 2 0',
                    width: 51,
                    text: 'Selector',
                    flex: 0
                },
                {
                    xtype: 'combobox',
                    queryMode: 'local',
                    size: 32,
                    editable: false,
                    displayField: 'name',
                    forceSelection: true,
                    store: Ext.create('GR06.store.common.CategoryStore'),
                    valueField: 'id',
                    flex: 0
                }               
            ]
        });

        me.callParent(arguments);
    }
});