/**
 * Store for the Category combo box.
 */
Ext.define('GR06.store.common.CategoryStore', {
    extend: 'Ext.data.Store',
    requires: 'GR06.model.common.Category',
    model: 'GR06.model.common.Category',

    storeId: 'common.CategoryStore',
 
    proxy: {
        type: 'ajax',
        url: 'pageFramework/getCategoryData',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});