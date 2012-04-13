/**
 * Controller for the Customer panel.
 */
Ext.define('GR06.controller.common.CustomerController', {
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
        {
            ref: 'catTreeExpandButton',
            selector: '#SiteCategoryPanel toolbar button[text="Expand All"]'
        },
        {
            ref: 'catTreeCollapseButton',
            selector: '#SiteCategoryPanel toolbar button[text="Collapse All"]'
        }
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
    },

    onSiteStoreLoad: function(store, records, successful, operation) {
        var siteComboBox = this.getSiteComboBox();
        siteComboBox.select(siteComboBox.store.first());
    },

    onTreePanelRender: function(treePanel) {
        // register toolbar handlers
        this.getCatTreeExpandButton().setHandler(function() {
            treePanel.expandAll();
        });
        this.getCatTreeCollapseButton().setHandler(function() {
            treePanel.collapseAll();
        });
    },

    onTreePanelLoad: function(store, records, successful, operation) {
        // select & expand root node
        var catTree = this.getCatTreePanel();
        var dummyRootNode = catTree.getRootNode();
        if (dummyRootNode) {
            var rootNode = dummyRootNode.firstChild;
            catTree.getSelectionModel().select(rootNode);
            rootNode.expand();
        }
    },

    onTreePanelSelectionChange: function(model, records) {
        if (records[0]) {
            this.updateProxyParams(this.getSiteComboBox().getValue(), records[0].data.id);

            this.refreshCategoryDependentPanels();
        }
    },

    onComboBoxChange : function(combo, newValue, oldValue) {
        this.updateProxyParams(newValue, 0);

        this.refreshCategoryTree();
        this.refreshSiteDependentPanels();
    },

    // -- Helper functions --

    /**
     * Go through all relevant data stores and update the siteId & catId params.
     * @param siteId
     * @param catId
     */
    updateProxyParams: function(siteId, catId) {
        var dataStores = [
            Ext.getStore('common.CatTreeStore'),
            Ext.getStore('campaign.CampaignGridStore'),
            Ext.getStore('campaign.AdGroupTreeStore'),
            Ext.getStore('campaign.UngroupedKwStore')
        ];

        Ext.each(dataStores, function(ds) {
            var extraParams = ds.getProxy().extraParams || {};
            if (siteId) extraParams.siteId = siteId;
            if (catId)  extraParams.catId = catId;
        });
    },

    refreshCategoryTree: function() {
        var catTreeStore = Ext.getStore('common.CatTreeStore');
        catTreeStore.load();
    },

    refreshSiteDependentPanels: function() {
        var activeTab = Ext.getCmp('CampaignManagementPanel').getActiveTab();
        var activeTabId = activeTab.getItemId();

        if ('AdGroupPanel' == activeTabId) {
            Ext.getStore('campaign.UngroupedKwStore').load();
        }
    },

    refreshCategoryDependentPanels: function() {
        var activeTab = Ext.getCmp('CampaignManagementPanel').getActiveTab();
        var activeTabId = activeTab.getItemId();

        if ('CampaignPanel' == activeTabId) {
            var campaignGrid = activeTab.getComponent('CampaignGrid');
            var campaignForm = activeTab.getComponent('CampaignForm');

            var selectedCategory = this.getSelectedCategory();
            if (selectedCategory) {
                campaignGrid.show();
                Ext.getStore('campaign.CampaignGridStore').load();

                // check if the category id a leaf node.
                // if yes hide it in the grid
                campaignGrid.columns[2].hidden = selectedCategory.isLeaf();
            }
            else {
                campaignForm.hide();
                campaignGrid.hide();
            }
        }

        else if ('AdGroupPanel' == activeTabId) {
            var adGroupTreeStore = Ext.getStore('campaign.AdGroupTreeStore');
            adGroupTreeStore.setRootNode({ text: 'Home', id: '0' });
            adGroupTreeStore.load();
        }
    },

    /**
     * Get the selected category from the category tree.
     */
    getSelectedCategory : function() {
        return this.getCatTreePanel().getSelectionModel().getLastSelected()

    }
});
