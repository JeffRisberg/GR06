Ext.define('GR06.view.MainTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.mainTabPanel',
    requires: [
        'GR06.view.common.HomeXPanel',
        'GR06.view.common.AccountPanel',
        'GR06.view.common.ProductPanel',
        'GR06.view.business.SalesOrderPanel',
        'GR06.view.common.AdministrationPanel'
    ],
    
    id: 'MainTabPanel',
    bodyPadding: '',
    
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {                   
          items: [ 
          {
            xtype: 'homeXPanel',                         
          }, 
          {
            xtype: 'accountPanel',                         
          }, 
          {
            xtype: 'productPanel',         
          },
          {
            xtype: 'salesOrderPanel',            
          },
          {
            xtype: 'administrationPanel',                 
          } 
          ]        
        });

        me.callParent(arguments);
    }
});