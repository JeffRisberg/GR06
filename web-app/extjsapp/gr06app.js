Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    appFolder: 'extjsapp/app',
    name: 'GR06',

    stores: [       
        'common.ProductStore',       
        'business.SalesOrderStore',
        'common.AccountStore'
    ],

    controllers: [      
        'common.AccountController',
        'common.ProductController',       
        'business.SalesOrderController'
    ],

    views: [
        'Main'
    ],
        
    launch: function() {      
        Ext.QuickTips.init();    
        Ext.require('GR06.Override');   
       
        var main = Ext.create('GR06.view.Main');
    }
});
