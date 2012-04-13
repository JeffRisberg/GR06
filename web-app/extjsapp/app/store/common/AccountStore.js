/**
 * Store for the Account list.
 */
Ext.define('GR06.store.common.AccountStore', {
    extend: 'Ext.data.Store',
    requires: 'GR06.model.common.Account',
    model: 'GR06.model.common.Account',

    storeId: 'common.AccountStore',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'account/getData',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});