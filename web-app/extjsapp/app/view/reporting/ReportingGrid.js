/**
 * This is the main grid for the report
 */
Ext.define('GR06.view.reporting.ReportingGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.reportingGrid',
    requires: [ 'Ext.ux.grid.PageSize' ],

    enableLocking: true,

    tbar: [
        { xtype: 'button', itemId: 'dimension', text: "Dimensions", iconCls: 'iv-dim-icon' },
        '-',
        { xtype: 'button', itemId: 'export', text: "Export", iconCls: 'iv-excel-icon' },
        '-',
        { xtype: 'button', itemId: 'saveReport', text: "Save as Custom Report", iconCls: 'iv-table-save-icon' }
    ],

    columns: [], // dynamically populated by ReportController.js

    initComponent: function() {
        var filters = {
            ftype: 'filters',
            // encode and local configuration options defined previously for easier reuse
            encode: true // json encode the filter query
        };

        this.features = [filters];

        this.dockedItems = [
            {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                store: this.store,
                dock: 'bottom',
                plugins: [
                    Ext.create('Ext.ux.grid.PageSize')
                ]
            }
        ];

        this.callParent(arguments);
    }
});