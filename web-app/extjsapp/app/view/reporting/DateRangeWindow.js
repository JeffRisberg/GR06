/**
 * selector dialog
 */
 Ext.define('GR06.view.reporting.DateRangeWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.dateRangeWindow',

    id: 'DateRangeWindow',
    draggable: false,
    resizable: false,
    closable: false,
    shadow: false,
    width: 305, // overridden in ReportController.js
    height: 110,
    padding: 0,
    bodyPadding: 10,

    layout: {type: 'vbox'},

    buttons: [
        { text: 'Apply', itemId: 'ok' },
        {
            text: 'Cancel',
            itemId: 'cancel',
            handler: function() {
                this.up('window').close();
            }
        }
    ],

    initComponent: function() {
        this.items = [
            {
                xtype: 'container',
                layout: {type: 'hbox'},
                items: [
                    {
                        xtype: 'datefield',
                        id: 'startDate',
                        name: 'startDate',
                        fieldLabel: 'Date',
                        labelWidth: 40,
                        width: 150,
                        vtype: 'daterange',
                        endDateField: 'endDate'
                    },
                    {
                        xtype: 'datefield',
                        id: 'endDate',
                        name: 'endDate',
                        fieldLabel: '-',
                        labelSeparator: '',
                        labelWidth: 20,
                        labelStyle: 'padding-left:8px',
                        width: 130,
                        vtype: 'daterange',
                        startDateField: 'startDate'
                    }
                ]
            },
            {
                xtype: 'combobox',
                flex: 0,
                name: 'timeAggregation',
                forceSelection: true,
                editable: false,
                queryMode: 'local',
                fieldLabel: 'Aggregation Time',
                labelWidth: 120,
                labelAlign: 'left',
                width: 240,
                margin: '10 0 0 0 ',
                displayField: 'name',
                valueField: 'val',
                store: Ext.create('Ext.data.Store', {
                    fields: ['val', 'name'],
                    data : [
                        {val: 'yearMonthDay', name:'Day'},
                        {val: 'yearWeekDay', name:'Day of Week'},
                        {val: 'yearWeek', name:'Week'},
                        {val: 'yearMonth', name:'Month'},
                        {val: 'yearQuarter', name:'Quarter'},
                        {val: 'year', name:'Year'}
                    ]
                })
            }
        ];

        this.callParent(arguments);
    }
});