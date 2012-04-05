<!doctype html>
<html>
<head>
        <meta charset="utf-8"/>

<meta name="layout" content="main" />
 <g:set var="entityName" value="${message(code: 'book.label', default: 'Book')}" />
        <title></title>

        <link rel="stylesheet" href="/GR06/css/start/jquery-ui-1.8.11.custom.css" type="text/css" media="screen" charset="utf-8" />
               
        <script src="/GR06/js/jquery-1.7.2.min.js"></script>       
        <script src="/GR06/js/jquery-ui-1.8.11.custom.min.js"></script>               
        
        <script src="/GR06/js/extjs/bootstrap.js"></script> 
        <link rel="stylesheet" href="/GR06/js/extjs/resources/css/ext-all.css" type="text/css" media="screen" charset="utf-8" />
               
<style>  
</style>

<script type="text/javascript"> 
Ext.onReady(function() {

  Ext.define('Book', {
      extend: 'Ext.data.Model',
      fields: [
         {name: 'title',      type: 'string'},
         {name: 'author',     type: 'string'},
         {name: 'subtitle',   type: 'string'},
         {name: 'publisher',  type: 'string'},
         {name: 'pageCount',  type: 'int'}         
      ],
      idProperty: 'survId'
  });
  
  var store = new Ext.data.Store({
    model: 'Book',
    proxy: {
        type: 'ajax',
        url : '${createLink(controller: 'renderExtJs', action: 'gridData')}',
        reader: {
            type: 'json'
        }
    }
  });
  store.load();

  // create the grid
  var grid = new Ext.grid.GridPanel({
      store: store,
      columns: [
          {header: "Title", width: 160, dataIndex: 'title', sortable: true},
          {header: "Author", width: 120, dataIndex: 'author', sortable: true},
          {header: "Subtitle", width: 120, dataIndex: 'subtitle', sortable: true},
          {header: "Publisher", width: 90, dataIndex: 'publisher', sortable: true},      
          {header: "Pages", width: 90, dataIndex: 'pageCount', sortable: true}        
      ],
      renderTo:'list',
      width:740,height:300
  });
});
</script>
</head>

<body>  
   <div class="nav">
            <span class="menuButton"><a class="home" href="${createLink(uri: '/')}"><g:message code="default.home.label"/></a></span>
            <span class="menuButton"><g:link class="create" action="create"><g:message code="default.new.label" args="[entityName]" /></g:link></span>
        </div>
        <div class="body">
            <h1><g:message code="default.list.label" args="[entityName]" /></h1>
            <g:if test="${flash.message}">
            <div class="message">${flash.message}</div>
            </g:if>
            <div class="list">
                <table id="list"></table>
                <div id="entries"></div>
            </div>           
        </div>
</body>
</html>
