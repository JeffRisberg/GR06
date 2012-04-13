Ext.define('GR06.view.campaign.CampaignGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.campaignGrid',

    id: 'CampaignGrid',
    store: 'campaign.CampaignGridStore',

    requires: [
        'GR06.view.campaign.CampaignUpdatePanelView'
    ],


    initComponent: function() {


        this.dockedItems = [
            {
                xtype: 'pagingtoolbar',
                itemId: 'CampaignGridToolbar',
                stateful: false,
                displayInfo: true,
                store: 'campaign.CampaignGridStore',
                dock: 'bottom'
            },
            {
                xtype: 'campaignUpdatePanel',
                dock: 'top'
            }
        ],
            this.selModel= Ext.create('Ext.selection.CheckboxModel', {
            }),
            this.columns= [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'categoryName',
                    text: 'Category'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'status',
                    text: 'Status'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'dailyBudget',
                    text: 'Budget (USD)'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'startDate',
                    text: 'Start Date',
                    renderer: Ext.util.Format.dateRenderer('m/d/Y')
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'endDate',
                    text: 'End Date',
                    renderer: Ext.util.Format.dateRenderer('m/d/Y')
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'language',
                    text: 'Language'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'location',
                    text: 'Location'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'excludedLocation',
                    text: 'Excluded Location'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'searchNetwork',
                    text: 'Search Network'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'displayNetwork',
                    text: 'Display Network'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'devices',
                    text: 'Devices'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'adDelivery',
                    text: 'Delivery Method'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'adRotation',
                    text: 'AdRotation'
                },


                {
                    xtype: 'gridcolumn',
                    dataIndex: 'impressionCap',
                    text: 'Imp. Cap'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'impressionCapFrequency',
                    text: 'Imp. Cap Frequency'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'impressionCapScope',
                    text: 'Imp. Cap Scope'
                }

            ]

        this.callParent(arguments);
    }

});