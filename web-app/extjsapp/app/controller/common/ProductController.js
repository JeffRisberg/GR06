/**
 * Controller for the Product panel.
 */
Ext.define('GR06.controller.common.ProductController', {
    extend: 'Ext.app.Controller',

    // references to views used in the controller.
    refs: [
        {
            ref: 'productPanel',
            selector: '#ProductPanel treepanel'
        },
        {
            ref: 'productComboBox',
            selector: '#ProductPanel combobox'
        },      
    ],
});
