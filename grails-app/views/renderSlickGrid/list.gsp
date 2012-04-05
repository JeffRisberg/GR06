<!doctype html>
<html>
    <head>
        <meta charset="utf-8"/>

        <title></title>

        <link rel="stylesheet" href="/GR06/css/start/jquery-ui-1.8.11.custom.css" type="text/css" media="screen" charset="utf-8" />
        <link rel="stylesheet" href="/GR06/css/slickgrid/slick.grid.css" type="text/css" media="screen" charset="utf-8" />
        <link rel="stylesheet" href="/GR06/css/slickgrid/controls/slick.pager.css" type="text/css" media="screen" charset="utf-8" />
        <link rel="stylesheet" href="/GR06/css/slickgrid/slick-default-theme.css" type="text/css" media="screen" charset="utf-8" />
     
        <script src="/GR06/js/jquery-1.7.2.min.js"></script>       
        <script src="/GR06/js/jquery-ui-1.8.11.custom.min.js"></script>
        <script src="/GR06/js/jquery/jquery.event.drag-2.0.min.js"></script>
        <script src="/GR06/js/jquery/jquery.jsonp-1.1.0.min.js"></script>

        <script src="/GR06/js/slickgrid/slick.core.js"></script>
        <script src="/GR06/js/slickgrid/plugins/slick.cellrangedecorator.js"></script>
        <script src="/GR06/js/slickgrid/plugins/slick.cellrangeselector.js"></script>
        <script src="/GR06/js/slickgrid/plugins/slick.cellselectionmodel.js"></script>
        <script src="/GR06/js/slickgrid/slick.editors.js"></script>
        <script src="/GR06/js/slickgrid/slick.grid.js"></script>
        <script src="/GR06/js/slickgrid/slick.remotemodelwithpaging.js"></script>
        <script src="/GR06/js/slickgrid/controls/slick.remotepager.js"></script>

  <style>
    #myGrid .slick-column-name { color: black; }
    #myGrid .rightAlign { text-align: right; }
    #pager .slick-pager .slick-pager-settings-expanded { display: none; }    
  </style>

<script type="text/javascript"> 
  var grid;
  var loader = new Slick.Data.RemoteModel({
          getUrl: function() {
             return "${createLink(controller: 'renderSlickGrid', action: 'gridData')}";
          }
  });
 
  var storyTitleFormatter = function (row, cell, value, columnDef, dataContext) {
    return "<b><a href='" + dataContext["link"] + "' target=_blank>" +
        dataContext["title"] + "</a></b><br/>" + dataContext["description"];
  };

  var columns = [
    {id: "1", name: "Author", field: "author", width: 140},
    {id: "2", name: "Title", field: "title", width: 140}, 
    {id: "3", name: "Subtitle", field: "subtitle", width: 200}, 
    {id: "4", name: "Publisher", field: "publisher", width: 150},  
    {id: "5", name: "Page Count", field: "pageCount", width: 120, cssClass: "rightAlign"},  
    {id: "6", name: "Price", field: "price", width: 100, cssClass: "rightAlign"},    
  ];

  var options = {
    rowHeight: 26,
    editable: false,
    enableAddRow: false,
    enableCellNavigation: false
  };

  var loadingIndicator = null;

  $(function () {
    grid = new Slick.Grid("#myGrid", loader.data, columns, options);
    new Slick.Controls.Pager(loader, grid, $("#pager"));

    grid.onViewportChanged.subscribe(function (e, args) {
      var vp = grid.getViewport();
      loader.ensureData(vp.top, vp.bottom);
    });

    grid.onSort.subscribe(function (e, args) {
      loader.setSort(args.sortCol.field, args.sortAsc ? 1 : -1);
      var vp = grid.getViewport();
      loader.ensureData(vp.top, vp.bottom);
    });

    loader.onDataLoading.subscribe(function () {
      if (!loadingIndicator) {
        loadingIndicator = $("<span class='loading-indicator'><label>Buffering...</label></span>").appendTo(document.body);
        var $g = $("#myGrid");

        loadingIndicator
            .css("position", "absolute")
            .css("top", $g.position().top + $g.height() / 2 - loadingIndicator.height() / 2)
            .css("left", $g.position().left + $g.width() / 2 - loadingIndicator.width() / 2);
      }

      loadingIndicator.show();
    });

    loader.onDataLoaded.subscribe(function (e, args) {
      for (var i = args.from; i <= args.to; i++) {
        grid.invalidateRow(i);
      }

      grid.updateRowCount();
      grid.render();

      loadingIndicator.fadeOut();
    });

    $("#txtSearch").keyup(function (e) {
      if (e.which == 13) {
        loader.setSearch($(this).val());
        var vp = grid.getViewport();
        loader.ensureData(vp.top, vp.bottom);
      }
    });

    // load the first page
    grid.onViewportChanged.notify();
  });
</script>
</head>
<body>  
  <div style="width: 900px;">  
    <div id="myGrid" style="width:100%; height:300px;"></div>
    <div id="pager" style="width:100%; height:20px;"></div>
  </div> 
</body>
</html>
