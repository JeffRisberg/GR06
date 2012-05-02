/**
 * Controller for the SalesOrder panel.
 */
Ext.define('GR06.controller.business.SalesOrderController', {
    extend: 'Ext.app.Controller',
    
    refs: [
       { ref: 'salesOrderPanelCombobox',
         selector: 'salesOrderPanel > combobox[itemId=salesOrder]' }
      ],
      
    init: function() {     
      this.control({             
         'salesOrderPanel': {
             activate: this.onSalesOrderPanelActivate
         }
        });          
    },
    
    onSalesOrderPanelActivate: function(panel) {
        var combobox = this.getSalesOrderPanelCombobox();
        combobox.getStore().load();
    }
});