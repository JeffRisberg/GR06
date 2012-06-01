/**
 * Controller for the Reporting panel.
 *
 */
Ext.define('GR06.controller.reporting.ReportingController', {
    extend: 'Ext.app.Controller',
    requires: [              
        'GR06.view.reporting.ReportGrid',
        'GR06.view.reporting.DateRangeWindow',
        'GR06.view.reporting.DimensionWindow'
    ],

    refs: [
        { ref: 'mainTabPanel', selector: 'mainTabPanel' },
        { ref: 'topReportingPanel', selector: 'topReportingPanel' },
        { ref: 'reportingPanel', selector: 'reportingPanel' },
        { ref: 'standardReportingPanel', selector: 'reportingPanel panel[itemId=standardReporting]' },

        { ref: 'dateRangeContainer', selector: 'reportingPanel container[itemId=dateRange]' },       
        { ref: 'reportingGrid', selector: 'reportingPanel gridpanel' },
        { ref: 'metric1Combobox', selector: 'reportingPanel combobox[itemId=metric1]' },
        { ref: 'metric2Combobox', selector: 'reportingPanel combobox[itemId=metric2]' }
    ],

    firstLoad: true,

    dateFormat: {
        year: { gridFormat: 'Y', chartFormat: 'Y', step: Ext.Date.YEAR, stepValue: 1 },
        yearQuarter: { gridFormat: 'M/Y', chartFormat: 'Y/M', step: Ext.Date.MONTH, stepValue: 3 },
        yearMonth: { gridFormat: 'M/Y', chartFormat: 'Y/M', step: Ext.Date.MONTH, stepValue: 1 },
        yearWeek: { gridFormat: 'W/Y', chartFormat: 'Y/W', step: Ext.Date.DAY, stepValue: 7 },
        yearWeekDay: { gridFormat: 'D/W/Y', chartFormat: 'Y/W/D', step: Ext.Date.DAY, stepValue: 1 },
        yearMonthDay: { gridFormat: 'm/d/Y', chartFormat: 'M/j', step: Ext.Date.DAY, stepValue: 1 }
    },

    init: function() {
        this.control({
            'reportPanel': {
                beforerender: this.onReportPanelBeforeRender,
                afterrender: this.onReportPanelAfterRender
            },
            'reportPanel combobox[itemId=metric1], reportPanel combobox[itemId=metric2]': {
                change: this.onChartMetricChange
            },

            'dateRangeWindow button[itemId=ok]':    { click: this.onDateRangeWindowSubmit },

            // buttons
            'reportPanel button[itemId=dimension]':  { click: this.onDimensionButtonClick },
            'dimensionWindow button[itemId=ok]':     { click: this.onDimensionWindowSubmit },
            'reportPanel button[itemId=export]':     { click: this.onExportButtonClick },
            'reportPanel button[itemId=saveReport]': { click: this.onSaveReportButtonClick }           
        });

        // application-wide event handlers
        this.application.on('categoryChange', this.onCategoryChange, this);
    },

    onReportPanelBeforeRender: function(panel) {
        var session = iv.ReportingSession;

        // set default start & end date
        var endDate = Ext.Date.add(new Date(), Ext.Date.DAY, -1);
        var startDate = Ext.Date.add(endDate, Ext.Date.DAY, -30);
        session.setStartDate(startDate);
        session.setEndDate(endDate);

        // set default time aggregation
        session.setTimeAggregation('yearMonthDay');

        // set default chart metrics
        session.setChartMetric1('pub_Clicks');
        session.setChartMetric2('none');
    },

    onReportPanelAfterRender: function(panel) {
        var me = this;

        var session = iv.ReportingSession;
        this.loadDimensionAndMetrics(this.instantiateModelAndStore);

        var dateRangeContainer = this.getDateRangeContainer();
        var dateStr = Ext.Date.format(session.getStartDate(), 'M j, Y') + ' - ' +
                Ext.Date.format(session.getEndDate(), 'M j, Y');
        dateRangeContainer.update(dateStr + ' &raquo;');

        var dateRangeEl = dateRangeContainer.getEl();
        dateRangeEl.addClsOnOver('iv-date-range-over');
        dateRangeEl.on('click', function(e, t) {
            var windowWidth = 305;
            var window = Ext.getCmp('DateRangeWindow');
            if (!window) {
                dateRangeEl.addCls('iv-date-range-click');

                window = Ext.create('iv.view.reporting.DateRangeWindow', {
                    animateTarget: t,
                    width: windowWidth,
                    x: dateRangeEl.getRight() - windowWidth,
                    y: dateRangeEl.getBottom() - 3
                });
                window.on('close', function() {
                    dateRangeEl.removeCls('iv-date-range-click');
                });
                window.show();

                // populate start date & end date
                var session = iv.ReportingSession;
                window.down('datefield[name=startDate]').setValue(session.getStartDate());
                window.down('datefield[name=endDate]').setValue(session.getEndDate());

                // populate time aggregation
                window.down('combobox[name=timeAggregation]').setValue(session.getTimeAggregation());
            } else {
                window.close();
            }
        });
    },

    onChartMetricChange: function(field, newValue, oldValue) {
        this.redrawChart();
    },

    onDateRangeWindowSubmit: function(button) {
        var me = this;

        var window = button.up('window');
        var startDateField = window.down('datefield[name=startDate]');
        var endDateField = window.down('datefield[name=endDate]');

        var startDate = startDateField.getValue();
        var endDate = endDateField.getValue();
        var timeAggregation = window.down('combobox[name=timeAggregation]').getValue();

        // update reporting session
        var session = iv.ReportingSession;
        session.setStartDate(startDate);
        session.setEndDate(endDate);

        var oldTimeAggregation = session.getTimeAggregation();
        session.setTimeAggregation(timeAggregation);

        // only move forward when the date fields are valid (start date < end date, etc)
        if (startDateField.isValid() && endDateField.isValid()) {

            // close window
            window.close();

            // update displayed date range at the top right
            var dateRangeContainer = this.getDateRangeContainer();
            var dateStr = Ext.Date.format(session.getStartDate(), 'M j, Y') + ' - ' +
                    Ext.Date.format(session.getEndDate(), 'M j, Y');
            dateRangeContainer.update(dateStr + ' &raquo;');

            if (oldTimeAggregation != timeAggregation) {
                // update column date format
                var dateColumn = this.getReportGrid().lockedGrid.headerCt.down('datecolumn');
                dateColumn.format = this.dateFormat[timeAggregation].gridFormat;
            }

            this.loadProxyParamsFromSession();

            // delay reload for 300 ms - the time it takes for the window to close completely
            this.refreshGridAndChart(300, true);
        }
    },

    onDimensionButtonClick: function(button) {
        var window = Ext.getCmp('DimensionWindow');
        if (!window) {
            window = Ext.create('iv.view.reporting.DimensionWindow', {animateTarget: button});
            var reportPanel = this.getReportPanel();
            var buttonEl = button.getEl();
            var x = buttonEl.getLeft() - 3;
            var y = buttonEl.getBottom();

            window.setPosition(x, y);
            window.show();

            reportPanel.body.on('scroll', function(e, t) {
                var buttonEl = button.getEl();
                var x = buttonEl.getLeft() - 3;
                var y = buttonEl.getBottom();
                window.setPosition(x, y);
            });

            // Add dimension checkboxes and preselect them (based on the reporting session)
            var cbGroup = window.down('checkboxgroup');

            Ext.suspendLayouts();
            var allDimensions = iv.ReportingSession.getAllDimensions();
            for (var dimKey in allDimensions) {
                var dim = allDimensions[dimKey];
                var cb = Ext.create('Ext.form.field.Checkbox', {
                    name: 'dim', boxLabel: dim.data.name, inputValue: dim.data.val
                });
                cbGroup.add(cb);
            }
            Ext.resumeLayouts(true);

            cbGroup.setValue({dim: iv.ReportingSession.getDimensions()});
        } else {
            window.close();
            reportPanel.body.un('scroll');
        }
    },

    onDimensionWindowSubmit: function(button) {
        var me = this;

        var window = button.up('window');
        var selectedDim = window.down('checkboxgroup').getValue().dim;
        iv.ReportingSession.setDimensions(selectedDim);
        window.close();

        var reportGridStore = this.getReportGrid().getStore();
        reportGridStore.getProxy().extraParams.dim = selectedDim;

        // delay reload for 300 ms - the time it takes for the window to close completely
        this.refreshGridAndChart(300, false);
    },

    onExportButtonClick: function() {
     alert("Export");
    },
    
    onSaveReportButtonClick: function() {
     alert("Save report");
    },
    
    onCategoryChange: function(siteId, categoryNode) {
        if (this.isActivePanel()) {
            var me = this;

            var session = iv.ReportingSession;
            session.setSite(siteId);
            session.setCategory(categoryNode.data.id);

            // this load/refresh for the first load will be done right after the store is loaded
            // (see instantiateModelAndStore)
            if (!this.firstLoad) {
                this.loadProxyParamsFromSession();
                this.refreshGridAndChart(100, true);
            } else {
                this.firstLoad = false;
            }
        }
    },

    isActivePanel: function() {
        return (this.getMainTabPanel().getActiveTab() === this.getTopReportingPanel());
    },

    /**
     * Load dimensions and metrics from the server. After both of them have been loaded,
     * the specified callback function will be called.
     *
     * @param callbackFn    Callback function that will be called after the dimension and metrics are loaded
     */
    loadDimensionAndMetrics: function(callbackFn) {
        var numStoreLoaded = 0;
        var storeLoadStatus = {};

        var dimStore = Ext.create('iv.store.reporting.DimensionStore');
        var metricStore = Ext.create('iv.store.reporting.MetricStore');

        // load dimensions
        dimStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    storeLoadStatus.dimension = true;

                    // cache all loaded dimensions in the reporting session
                    var allDims = {};
                    dimStore.each(function(dim) {
                        allDims[dim.data.val] = dim;
                    });
                    iv.ReportingSession.setAllDimensions(allDims);
                }

                numStoreLoaded++;
                if (numStoreLoaded == 2)
                    callbackFn.call(this, storeLoadStatus, dimStore, metricStore);
            }
        });

        // load metrics
        metricStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if (success) {
                    storeLoadStatus.metrics = true;

                    // cache all loaded metrics in the reporting session
                    var allMetrics = {};
                    metricStore.each(function(metric) {
                        allMetrics[metric.data.val] = metric;
                    });
                    iv.ReportingSession.setAllMetrics(allMetrics);
                }

                numStoreLoaded++;
                if (numStoreLoaded == 2)
                    callbackFn.call(this, storeLoadStatus, dimStore, metricStore);
            }
        });
    },

    instantiateModelAndStore: function(storeLoadStatus, dimStore, metricStore) {
        var session = iv.ReportingSession;
        var allMetricsArray = [];

        // contains all dimensions + metrics
        var allFields = [];

        // these 2 dimensions always present
        allFields.push({name:'date', type:'date', dateFormat: 'time'});
        allFields.push({name:'iv_Category'});

        var allDimensions = session.getAllDimensions(); // allDimensions is a JS Object
        for (var dimKey in allDimensions) {
            allFields.push(allDimensions[dimKey].data.val);
        }

        var allMetrics = session.getAllMetrics(); // allMetrics is a JS Object
        for (var metricKey in allMetrics) {
            var metric = allMetrics[metricKey];
            allMetricsArray.push(metric);
            allFields.push(metric.data.val);
        }

        // create the report row model with all the dimensions & metrics
        var model = Ext.define('ReportRowModel', { extend: 'Ext.data.Model', fields: allFields });

        // create report grid panel
        var gridStore = this.storeFactory(model);
        var reportGridPanel = Ext.create('iv.view.reporting.ReportGrid', {
            store: gridStore,
            viewConfig: { loadMask: false } // disable default load mask and use our own load mask (see below)
        });
        // setup our own load mask
        gridStore.on('beforeload', function() { reportGridPanel.body.mask(); });
        gridStore.on('load', function() { reportGridPanel.body.unmask(); });

        // add columns to the grid panel
        var lockedHeaderCt = reportGridPanel.lockedGrid.headerCt; // locked columns
        var normalHeaderCt = reportGridPanel.normalGrid.headerCt; // regular columns

        lockedHeaderCt.add({ xtype: 'datecolumn', text: 'Date', dataIndex: 'date', filter: { type: 'date'} });
        lockedHeaderCt.add({ text: 'Category', width: 150, dataIndex: 'iv_Category', filterable: true });

        var insertIdx = 0;
        var firstColumn = lockedHeaderCt.down('gridcolumn[hidden=false]');
        if (firstColumn.isXType('datecolumn'))
            insertIdx++;
        var secondColumn = firstColumn.next();
        if (secondColumn && !secondColumn.isHidden() && secondColumn.dataIndex == 'iv_Category')
            insertIdx++;

        var i;
        for (i = allMetricsArray.length - 1; i >= 0; i--) {
            var metricData = allMetricsArray[i].data;
            var column = {
                xtype: 'numbercolumn', text: metricData.name, dataIndex: metricData.val,
                align: metricData.align, format: metricData.format,
                filter: { type: 'numeric' }
            };

            normalHeaderCt.insert(0, column);
        }

        var standardReportingPanel = this.getStandardReportingPanel();

        // add chart & grid to the reporting panel
        standardReportingPanel.add([
            { xtype: 'reportChartContainer', store: this.storeFactory(model) },
            reportGridPanel
        ]);

        // add reporting panel toolbar
        standardReportingPanel.addDocked({
            xtype: 'toolbar',
            dock: 'top',
            items: [
                this.chartMetricComboBoxFactory(metricStore, session.getChartMetric1(),
                        'metric1', 'Chart Metric 1', '0'),
                '->',
                this.chartMetricComboBoxFactory(metricStore, session.getChartMetric2(),
                        'metric2', 'Chart Metric 2', '3 0 3 20')
            ]
        });
        
        this.loadProxyParamsFromSession();
        this.refreshGridAndChart(100, true);
    },

    storeFactory: function(model) {
        return Ext.create('Ext.data.Store', {
            model: model,
            remoteFilter: true,
            remoteGroup: true,
            remoteSort: true,
            sorters: [
                { property: 'date', direction: 'DESC' }
            ],
            proxy: Ext.create('iv.store.reporting.ReportStoreProxy')
        });
    },

    chartMetricComboBoxFactory: function(store, defaultValue, itemId, fieldLabel, margin) {
        return {
            xtype: 'combobox',
            itemId: itemId,
            editable: false,
            queryMode: 'local',
            fieldLabel: fieldLabel,
            labelPad: 5,
            labelWidth: 90,
            width: 225,
            margin: margin,
            displayField: 'name',
            valueField: 'val',
            store: store,
            value: defaultValue
        }
    },

    loadProxyParamsFromSession : function() {
        var chartStore = this.getReportChart().getStore();
        var gridStore = this.getReportGrid().getStore();
        var stores = [gridStore, chartStore];

        // common params for both chartStore & gridStore
        for (var i = stores.length - 1; i >= 0; i--) {
            var store = stores[i];
            var proxyParams = store.getProxy().extraParams;

            var session = iv.ReportingSession;
            proxyParams.timeAggregation = session.getTimeAggregation();

            var startDate = session.getStartDate();
            if (startDate)
                proxyParams.startDate = Ext.Date.format(startDate, 'm/d/Y');

            var endDate = session.getEndDate();
            if (endDate)
                proxyParams.endDate = Ext.Date.format(endDate, 'm/d/Y');

            proxyParams.siteId = session.getSite();
            proxyParams.catId = session.getCategory();
        }

        // specific params for gridStore
        gridStore.getProxy().extraParams.dim = session.getDimensions();

        // specific params for chartStore
        chartStore.getProxy().extraParams.isChart = true;
        chartStore.pageSize = 90; // max chart data points
    },

    refreshGridAndChart: function(delayMs, refreshChart) {
        var me = this;

        // delay reload for 100 ms
        var task = new Ext.util.DelayedTask(function() {
            me.getReportGrid().getStore().loadPage(1, {
                scope: me,
                callback: function(records, operation, success) {
                    if (!success) {
                        
                        // only show alert message if the user is still on the reporting panel
                        //todo: this doesn't quite work as expected now
//                        if (this.isActivePanel())
//                            Ext.MessageBox.alert('Reporting Alert',
//                                    "Your request can't be completed now.<br/> Please check back later.");
                    }
                }
            });

            if (refreshChart) {
                var chartBody = me.getReportChart().getEl();
                chartBody.mask('loading...', 'x-msg-box-wait');
                me.getReportChart().getStore().load({
                    scope: me,
                    callback: function(records, operation, success) {
                        chartBody.unmask();
                    }
                });

                me.redrawChart();
            }
        });
        task.delay(delayMs);
    },

    redrawChart: function() {
        var chart = this.getReportChart();

        // update the series
        var series = chart.series;
        for (var i = series.length - 1; i >= 0; i--) {
            if (series[i])
                series[i].unHighlightItem();
        }
        series.clear();
        var hasActiveSeries = this.addAxisAndSeries(chart, 'left', this.getMetric1Combobox());
        hasActiveSeries = this.addAxisAndSeries(chart, 'right', this.getMetric2Combobox()) || hasActiveSeries;

        // update the time axis
        chart.axes.remove(chart.axes.getByKey('bottom'));
        if (hasActiveSeries) {
            // Figure out the time axis dateFormat based on the selected aggregation time
            var timeAggString = {
                year: { dateFormat: 'Y', step: Ext.Date.YEAR, value: 1 },
                yearQuarter: { dateFormat: 'Y/M', step: Ext.Date.MONTH, value: 3 },
                yearMonth: { dateFormat: 'Y/M', step: Ext.Date.MONTH, value: 1 },
                yearWeek: { dateFormat: 'Y/W', step: Ext.Date.DAY, value: 7 },
                yearWeekDay: { dateFormat: 'Y/D', step: Ext.Date.DAY, value: 1 },
                yearMonthDay: { dateFormat: 'M/j', step: Ext.Date.DAY, value: 1 }
            };

            var timeAgg = iv.ReportingSession.getTimeAggregation();
            var dateFormat = this.dateFormat[timeAgg];

            chart.axes.add('bottom', {
                type: 'Time',
                position: 'bottom',
                fields: ['date'],
                dateFormat: dateFormat.chartFormat,
                step: [dateFormat.step, dateFormat.stepValue]
            });

            // refresh chart
            chart.surface.removeAll();
            chart.redraw(false);
            chart.show();
        }
        else {
            chart.hide();
        }
    },

    addAxisAndSeries: function(chart, position, metric) {
        var seriesAdded = false;

        var fieldName = metric.getValue();
        if (fieldName != 'none') {
            var fieldTitle = metric.getRawValue();

            // update axis
            chart.axes.remove(chart.axes.getByKey(position));
            chart.axes.add(position, { type: 'Numeric', position: position, fields: [fieldName], title: fieldTitle });

            // add series
            var series = {
                type: 'line',
                highlight: true,
                axis: position,
                title: fieldTitle,
                xField: 'date',
                yField: fieldName,
                tips: {
                    width: 65,
                    height: 20,
                    trackMouse: false,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get(fieldName));
                    }
                }
            };

            chart.series.add(series);
            seriesAdded = true;
        }

        return seriesAdded;
    }
});
