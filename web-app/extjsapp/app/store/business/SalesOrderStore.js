/**
 * Store for the SalesOrder list.
 */
Ext.define('GR06.store.business.SalesOrderStore', {
    extend: 'Ext.data.Store',
    requires: 'GR06.model.business.SalesOrder',
    model: 'GR06.model.business.SalesOrder',

    storeId: 'business.SalesOrderStore',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'salesOrder/getData',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});