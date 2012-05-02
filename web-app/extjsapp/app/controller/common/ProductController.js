/**
 * Controller for the Product panel.
 */
Ext.define('GR06.controller.common.ProductController', {
    extend: 'Ext.app.Controller',
    
    refs: [
     { ref: 'productPanelDataview',
       selector: 'productPanel > dataview[itemId=productView]' }
    ],
    
    init: function() {     
      this.control({             
         'productPanel': {
             activate: this.onProductPanelActivate
         }
        });          
    },
    
    onProductPanelActivate: function(panel) {
        var dataview = this.getProductPanelDataview();
        dataview.getStore().load();
    }
});
