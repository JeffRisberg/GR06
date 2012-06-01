/**
 * A vertical box, containing the buttons, the settings, the chart, and the grid
 */
Ext.define('GR06.view.reporting.ReportingPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.reportingPanel',

    title: 'Reporting',
    layout: { type: 'vbox', align: 'stretch' },
    cls: 'reporting-opts',

    autoScroll: true,

    initComponent: function() {
        this.items = [
            {
                // this is the date range at the top
                xtype: 'container',
                items: [
                    {
                        xtype: 'container',
                        itemId: 'dateRange',
                        margin: '5 10 0 0',
                        padding: 5,
                        componentCls:'iv-date-range'
                    }
                ]
            },
            {
                xtype: 'tabpanel',
                padding: '0 10 10 10',
                items: [
                    {
                        // standard reporting panel. The content of this panel is populated by ReportController
                        // because it is dependent on dynamic model & store.
                        xtype: 'panel',
                        title: 'Standard Reporting',
                        itemId: 'standardReporting'
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});