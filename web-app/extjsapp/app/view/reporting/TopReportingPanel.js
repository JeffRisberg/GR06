/**
 * Top panel, contains the site category panel on the left (west), and the report panel in the middle
 */
 Ext.define('GR06.view.reporting.TopReportingPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.topReportingPanel',
    requires: [
        'GR06.view.common.CategoryPanel',
        'GR06.view.reporting.ReportingPanel'
    ],

    title: 'Reporting',
    layout: 'border',
    items: [
        {
            xtype: 'categoryPanel',
            region: 'west',
            split: true
        },
        {
            xtype: 'reportingPanel',
            region: 'center'
        }
    ]
});