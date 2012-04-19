Ext.define("GR06.model.business.SalesOrder", {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'id', type: 'string'},
        {name: 'datePlaced', type: 'date'},
        {name: 'dateDue', type: 'date'}
    ]

});