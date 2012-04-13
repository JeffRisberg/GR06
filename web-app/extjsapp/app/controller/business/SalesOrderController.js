/**
 *
 */

Ext.define('GR06.controller.business.SalesOrderController', {
    extend: 'Ext.app.Controller',

    init: function() {
      this.control({
          'campaignUpdatePanel button[action=save]': {
              click: this.updateCampaign
          },
          'campaignUpdatePanel button[action=add]': {
              click: this.addCampaign
          }
      });
    },

    /**
     * Fired when 'Save' button clicked.
     * Sync the store with the server.
     */
    updateCampaign: function() {
        var campaignStore = Ext.getStore('campaign.CampaignGridStore');
        campaignStore.sync();
    },

    /**
     * Fired when 'Add' button clicked.
     * Creates a new campaign model, add it to store
     * and then select it in the grid.
     *
     * @param button
     */
    addCampaign: function(button) {


        var siteCategoryPanel = Ext.getCmp('SiteCategoryPanel');
        var categoryTree = siteCategoryPanel.down('treepanel');
        var currentCategory =  categoryTree.getSelectionModel().getLastSelected();

        var currentSiteId = siteCategoryPanel.down('combobox').getValue();

        var campaign = Ext.create('GR06.model.campaign.CampaignModel',{
            name: 'new cmpn',
            status: 'Active',
            categoryName: currentCategory.get('text'),
            catId: currentCategory.get('id'),
            siteId: currentSiteId,
            dailyBudget:'0.00',
            startDate:new Date(),
            language:'All',
            location: 'United States',
            adDelivery:'Accelerated',
            adRotation:'Optimized For Clicks',
            impressionCap:'0',
            impressionCapFrequency:'Per Day',
            impressionCapScope:'This campaign',
            searchNetwork:'Publisher Search and Search Network',
            displayNetwork:'None'
        });

        var campaignStore = Ext.getStore('campaign.CampaignGridStore');
        campaign = campaignStore.add(campaign)[0];
        button.up('grid').getSelectionModel().select(campaign);
    }


});