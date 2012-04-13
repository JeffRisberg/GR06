Ext.Loader.setConfig({
    enabled: true
});

// define global strings
Ext.iv = {
    VARIES: '<varies>'
};

Ext.application({
    appFolder: '/extjsapp/app',
    name: 'GR06',

    stores: [
        'common.CustomerStore',
        'common.ProductTreeStore',       
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

        var viewPort = Ext.create('GR06.view.Viewport');
    }

});
