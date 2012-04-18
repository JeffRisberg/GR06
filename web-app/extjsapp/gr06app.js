Ext.Loader.setConfig({
    enabled: true
});

alert("t");
Ext.application({
    appFolder: 'extjsapp/app',
    name: 'GR06',

    stores: [
        'common.AccountStore',
        'common.ProductStore',       
        'business.SalesOrderStore'
    ],

    controllers: [
        'common.MainTabController',
        'common.AccountController',
        'common.ProductController',       
        'business.SalesOrderController'
    ],

    launch: function() {      
        Ext.QuickTips.init();    
        Ext.require('GR06.Override');   
        alert("launch");
        var main = Ext.create('GR06.view.Main');
    }
});
