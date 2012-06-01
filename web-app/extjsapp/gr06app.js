Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    appFolder: 'extjsapp/app',
    name: 'GR06',

    stores: [       
        'common.CategoryStore',
        'business.ProductStore',       
        'business.SalesOrderStore',
        'business.AccountStore'
    ],

    controllers: [  
        'common.LoginController',
        'common.CategoryController',       
        'common.WorkspaceController',    
        'business.AccountController',
        'business.ProductController',       
        'business.SalesOrderController',
        'reporting.ReportingController'
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
