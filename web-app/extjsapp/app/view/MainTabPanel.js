Ext.define('GR06.view.MainTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.mainTabPanel',
    
    requires: [
        'GR06.view.common.HomePanel',
        'GR06.view.business.AccountPanel',
        'GR06.view.business.ProductPanel',
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
            xtype: 'homePanel',                         
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