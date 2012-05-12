/**
 * 
 */
Ext.define('GR06.view.business.AccountPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.accountPanel',
    requires: [
        'GR06.view.common.CategoryPanel',
        'GR06.view.business.AccountList'
    ],

    title: 'Accounts',
    layout: 'border',
    items: [
        {
            xtype: 'categoryPanel',
            region: 'west',
            split: true
        },
        {
            xtype: 'accountList',
            region: 'center'
        }
    ]
});