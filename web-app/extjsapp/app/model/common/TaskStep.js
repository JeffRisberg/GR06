/**
 * Used by the Workspace panel.
 */
Ext.define('GR06.model.common.TaskStep', {
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
            name: 'detail'
        },
        {
            name: 'startDate'
        },
        {
            name: 'completedDate'
        },
        {
            name: 'user'
        }
    ]
});