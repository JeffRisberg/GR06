/**
 * Used by the Metric selectors.
 */
Ext.define('GR06.model.reporting.Metric', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id' },
        {name: 'val' },
        {name: 'name' },
        {name: 'align' },
        {name: 'type' },
        {name: 'format' }
    ]
});