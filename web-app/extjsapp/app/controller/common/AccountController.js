/**
 * Controller for the Account panel.
 */
Ext.define('GR06.controller.common.AccountController', {
    extend: 'Ext.app.Controller',
    
    refs: [
     { ref: 'accountPanelGrid',
       selector: 'accountPanel > gridpanel[itemId=accountGrid]' }
    ],
    
    doRowClick: function() {
        alert("click");
    },
    doRowDblClick: function() {
        alert("dbl");
    },
    
    init: function() {
      alert("setting up event handlers");     
      this.control({
         'accountPanel > gridpanel': {
             itemclick: this.doRowClick,  
             itemdblclick: this.doRowDblClick                 
         }
         });
      alert("setting up event handlers");      
    }
});
