<%@ page import="com.incra.domain.ColumnDataType" %>
<%@ page import="com.incra.Book" %>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="layout" content="main" />
        <g:set var="entityName" value="${message(code: 'book.label', default: 'Book')}" />
        <title><g:message code="default.list.label" args="[entityName]" /></title>
        <style type="text/css">
          .list { width: 800px; }
          #list { width: 800px; }
        </style>
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
        <script type="text/javascript">  
        $(document).ready(function () {                            
         $("#list").wijgrid({
          allowColSizing: true,
          allowPaging: true,
          pageSize: 10,

          data: new wijdatasource({
            dynamic: true,
            proxy: new wijhttpproxy({
              url: "${createLink(controller: 'book', action: 'gridData')}",
              dataType: "json",             
              data: {                
              },
              type: "POST",
              key: "series"
            }),

            reader: {
              read: function (dataSource) {
              console.log(dataSource);
                var count = dataSource.data.count;               

                $("#entries").text("(" + count + " entries found)");
                              
                var columnDefs = [];               
                for (var value in dataSource.data.columns) {  
                  var fieldName = dataSource.data.columns[value]        
                  var columnDef = { 'name': fieldName, 'mapping': fieldName };
                  columnDefs.push(columnDef);
                }    
                          
                dataSource.data = dataSource.data.results;
                dataSource.data.totalRows = count;  
                new wijarrayreader(columnDefs).read(dataSource);                            
              }
            },

            loading: function (dataSource, userData) {
              var r = userData.data.paging;             
              dataSource.proxy.options.data.offset = r.pageIndex * r.pageSize;
              dataSource.proxy.options.data.max = r.pageSize;
            }
           }),
          columns: [
             <g:each var="metric" in="${metrics}"> { 
             headerText: '${metric.label}',
             cellFormatter: function (args) {
               if (args.row.type & $.wijmo.wijgrid.rowType.data) {
                 args.$container.css('text-align', '${metric.alignment}');
                 return false;
               }
             }
             }, </g:each>             
          ]                                         
         });        
        });        
        </script>
    </body>
</html>
