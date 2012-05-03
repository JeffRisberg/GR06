/**
 * Store for the Product list.
 */
Ext.define('GR06.store.business.ProductStore', {
    extend: 'Ext.data.Store',
    requires: 'GR06.model.business.Product',
    model: 'GR06.model.business.Product',

    storeId: 'business.ProductStore',
    
    proxy: {
        type: 'ajax',
        url: 'product/getData',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
