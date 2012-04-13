/**
 * Store for the Customer combo box.
 */
Ext.define('GR06.store.common.CustomerStore', {
    extend: 'Ext.data.Store',
    requires: 'GR06.model.common.Customer',
    model: 'GR06.model.common.Customer',

    storeId: 'common.CustomerStore',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: '/customer/getData',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});