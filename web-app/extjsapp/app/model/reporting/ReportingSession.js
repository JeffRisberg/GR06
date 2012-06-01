/**
 * defines the reporting session on the client side.
 */
Ext.define('GR06.model.reporting.ReportingSession', {
    extend: 'Ext.data.Model',
    fields: [
        'name',
        'dimensions',
        'metrics',
        'startDate',
        'endDate',
        'timeAggregation',
        'chartMetricName1',
        'chartMetricName2',
        'category',
        'site'
    ]
});