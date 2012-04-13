Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    appFolder: 'extjsapp/app',
    name: 'GR06',

    stores: [
        'common.CustomerStore',
        'common.ProductStore',       
        'business.SalesOrderStore'
    ],

    controllers: [
        'common.MainTabController',
        'common.CustomerController',
        'common.ProductController',       
        'business.SalesOrderController'
    ],

    launch: function() {      
        Ext.QuickTips.init();       

        var main = Ext.create('GR06.view.Main');
    }

});
