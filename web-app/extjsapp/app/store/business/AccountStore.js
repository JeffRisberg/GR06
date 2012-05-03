/**
 * Store for the Account list.
 */
Ext.define('GR06.store.business.AccountStore', {
    extend: 'Ext.data.Store',
    requires: 'GR06.model.business.Account',
    model: 'GR06.model.business.Account',

    storeId: 'business.AccountStore',
    
    proxy: {
        type: 'ajax',
        url: 'account/getData',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});