/**
 * Controller for the Account panel.
 */
Ext.define('GR06.controller.business.AccountController', {
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
      this.control({
         'accountPanel > gridpanel': {
             itemclick: this.doRowClick,  
             itemdblclick: this.doRowDblClick                 
         },        
         'accountPanel': {
                activate: this.onAccountPanelActivate
         }
        });          
    },
    
    onAccountPanelActivate: function(panel) {
        var grid = this.getAccountPanelGrid();
        grid.getStore().load();
    }
});
