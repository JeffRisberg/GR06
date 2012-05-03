Ext.define('GR06.view.business.AccountPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.accountPanel',    

    requires: [
        'GR06.store.business.AccountStore'
    ],
    
    title: 'Accounts',    
    layout: {
        align: 'stretch',
        padding: '',
        type: 'vbox'
    },
    border: 0,
    padding: '',   
    bodyPadding: 5,      
   
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [               
                {
                    flex: 1,
                    xtype: 'gridpanel',
                    itemId: "accountGrid",
                    columns: [        
                        { dataIndex: 'name', text: 'Name', align:'left', width: 200 },
                        { dataIndex: 'description', text: 'Description', align:'left' }                     
                    ],                                      
                    store: Ext.create('GR06.store.business.AccountStore')                    
                },
                {
                    flex: 1,
                    xtype: 'form',
                    margin: '0 0 2 0',                                       
                    defaultType: 'textfield',
                    
                    items: [{
                        fieldLabel: 'Name',
                        name: 'name',
                        allowBlank: false
                    },{
                        fieldLabel: 'Description',
                        name: 'description',
                        allowBlank: false
                    }],

                    // Reset and Submit buttons
                    buttons: [{
                        text: 'Reset',
                        handler: function() {
                            this.up('form').getForm().reset();
                        }
                    },{
                        text: 'Submit',
                        formBind: true, //only enabled once the form is valid
                        disabled: true,
                        handler: function() {
                            var form = this.up('form').getForm();
                            if (form.isValid()) {
                                form.submit({
                                    success: function(form, action) {
                                       Ext.Msg.alert('Success', action.result.msg);
                                    },
                                    failure: function(form, action) {
                                        Ext.Msg.alert('Failed', action.result.msg);
                                    }
                                });
                            }
                        }
                    }]                  
                }
            ]
        });

        me.callParent(arguments);
    }
});

