/**
 * Used by the Workspace panel.
 */
Ext.define('GR06.model.common.Task', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'id'
        },
        {
            name: 'name'
        },
        {
            name: 'status'
        },
        {
            name: 'statusId'
        },
        {
            name: 'site'
        },
        {
            name: 'siteId'
        },
        {
            name: 'startDate'
        },
        {
            name: 'completedDate'
        },
        {
            name: 'user'
        },
        {
            name: 'detail'
        }
    ]
});