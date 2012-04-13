
Ext.define('GR06.view.MainTabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.mainTabPanel',
    requires: [
        'GR06.view.common.SiteCategoryPanel',
        'GR06.view.CampaignManagementPanel'
    ],

    id: 'MainTabPanel',
    bodyPadding: '',
    title: '',
    activeTab: 1,
    plain: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    itemId: 'HomePanel',
                    title: 'Home'
                },
                {
                    xtype: 'panel',
                    itemId: 'CampaignPanel',
                    layout: {
                        type: 'border'
                    },
                    title: 'Campaigns',
                    items: [
                        {
                            xtype: 'siteCategoryPanel',
                            region: 'west',
                            split: true
                        },
                        {
                            xtype: 'panel',
                            border: 0,
                            html: 'No new notification.',
                            itemId: 'NotificationPanel',
                            maxHeight: 200,
                            minHeight: 70,
                            autoScroll: true,
                            bodyPadding: 5,
                            animCollapse: false,
                            collapsed: true,
                            collapsible: true,
                            frameHeader: false,
                            title: 'Notification',
                            titleCollapse: true,
                            floatable: false,
                            region: 'north',
                            split: true,
                            items: [
                                // todo: this is for testing
                                {
                                    xtype: 'button',
                                    id: 'ReviewKeywordScoringButton',
                                    text: 'Review Keyword Scoring Result'
                                },
                                {
                                    xtype: 'button',
                                    id: 'ReviewKeywordCategorizationButton',
                                    text: 'Review Keyword Categorization Result'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'TaskId',
                                    fieldLabel: 'Task Id',
                                    value: 5
                                }
                            ]
                        },
                        {
                            xtype: 'campaignManagementPanel',
                            region: 'center'
                        },
                        {
                            xtype: 'workspacePanel',
                            region: 'east',
                            split: true
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    itemId: 'ReportingPanel',
                    title: 'Reporting'
                },
                {
                    xtype: 'panel',
                    itemId: 'AdminPanel',
                    title: 'Administration'
                }
            ]
        });

        me.callParent(arguments);
    }

});