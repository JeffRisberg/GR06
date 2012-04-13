/**
 * Controller for the Product panel.
 */
Ext.define('GR06.controller.common.ProductController', {
    extend: 'Ext.app.Controller',

    // references to views used in the controller.
    refs: [
        {
            ref: 'catTreePanel',
            selector: '#SiteCategoryPanel treepanel'
        },
        {
            ref: 'siteComboBox',
            selector: '#SiteCategoryPanel combobox'
        },      
    ],

    init: function() {
        this.control({
            '#SiteCategoryPanel > treepanel' : {
                render          : this.onTreePanelRender,
                load            : this.onTreePanelLoad,
                selectionchange : this.onTreePanelSelectionChange
            },

            '#SiteCategoryPanel > combobox': {
                change          : this.onComboBoxChange
            }
        });

        Ext.getStore("common.SiteStore").on('load', this.onSiteStoreLoad, this);
    }
});
