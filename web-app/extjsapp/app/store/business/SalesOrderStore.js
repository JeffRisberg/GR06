/**
 * Store for sales order model.
 */

Ext.define('GR06.store.business.SalesOrderStore', {
    extend: 'Ext.data.Store',
    model : 'GR06.model.business.SalesOrderModel',

    storeId: 'business.SalesOrderStore',
    pageSize: 10,
    remoteFilter: true,
    remoteGroup: true,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        api: {
            read: '/salesOrder/asyncGet',
            update: '/salesOrder/asyncUpdate',
            create: '/salesOrder/asyncCreate'
        },
        directionParam: 'order',
        limitParam: 'max',
        simpleSortMode: true,
        startParam: 'offset',
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            writeAllFields: false,
            root: 'data'
        },
        listeners: {
            exception: function(proxy, response, operation){
                Ext.MessageBox.show({
                    title: 'Something went wrong',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    listeners: {
        write: function(proxy, operation){
            var msgCt = Ext.core.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            var msg = '<div class="msg"><h3>' + operation.resultSet.message + '</h3></div>'
            var m = Ext.core.DomHelper.append(msgCt, msg, true);
            m.hide();
            m.slideIn('t').ghost("t", { delay: 2000, remove: true});

        }
    }
});