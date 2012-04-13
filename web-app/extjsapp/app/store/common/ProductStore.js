/**
 * Store for the Product list box.
 */
Ext.define('GR06.store.common.ProductStore', {
    extend: 'Ext.data.Store',
    requires: 'GR06.model.common.Product',
    model: 'GR06.model.common.Product',

    storeId: 'common.ProductStore',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'product/getData',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});