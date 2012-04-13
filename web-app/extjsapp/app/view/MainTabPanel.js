
Ext.define('GR06.view.MainTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.mainTabPanel',
    
    id: 'MainTabPanel',
    bodyPadding: '',
    title: '',
    activeTab: 1,
    plain: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    itemId: 'HomePanel',
                    title: 'Home'
                }
            ]
        });

        me.callParent(arguments);
    }

});