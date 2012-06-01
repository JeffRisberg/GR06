/**
 * selector dialog
 */
 Ext.define('GR06.view.reporting.DimensionWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.dimensionWindow',

    id: 'DimensionWindow',
    closable: false,
    draggable: false,
    resizable: false,
    shadow: false,
    padding: 0,
    bodyPadding: 10,

    buttons: [
        { text: 'OK', itemId: 'ok' },
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
                xtype: 'checkboxgroup',
                width: 400,
                columns: 3,
                vertical: true,
                margin: '0 10',
                defaults: {
                    padding: 10
                }
            }
        ];
        this.callParent(arguments);
    }
});