/**
 * Modified version of slick.remotemodel.js that works with a standard pager.
 */
(function ($) {
    function RemoteModel(args) {
        // private
        var data = new Array();
        var sortcol = null;
        var sortdir = 1;
        var h_request = null;
        var req = null; // ajax request

        var pagesize = 10;
        var pagenum = 0;
        var totalRows = 0;

        // events
        var onDataLoading = new Slick.Event();
        var onDataLoaded = new Slick.Event();
        var onPagingInfoChanged = new Slick.Event();

        function init() {
        }

        function isDataLoaded(from, to) {
            for (var i = from; i <= to; i++) {
                if (data[i] == undefined || data[i] == null) {
                    return false;
                }
            }

            return true;
        }

        function clear() {
            for (var key in data) {
                delete data[key];
            }
            data.length = 0;
        }

        function ensureData(from, to) {
            if (req) {
                req.abort();
                for (var i = req.fromPage; i <= req.toPage; i++)
                    data[i * pagesize] = undefined;
            }

            if (from < 0) {
                from = 0;
            }

            if (to == 0)
                to = pagesize;

            var fromPage = Math.floor(from / pagesize);
            var toPage = Math.floor(to / pagesize);

            var url = args.getUrl();
            url += ((url.indexOf('?') == -1) ? '?' : '&');
            url += ("offset=" + (fromPage * pagesize) + "&max=" + pagesize);

            if (sortcol)
                url += ("&sort=" + sortcol);
            if (sortdir)
                url += ("&order=" + ((sortdir > 0) ? "asc" : "desc"));

            if (h_request != null) {
                clearTimeout(h_request);
            }

            h_request = setTimeout(function () {
                for (var i = fromPage; i <= toPage; i++)
                    data[i * pagesize] = null; // null indicates a 'requested but not available yet'

                onDataLoading.notify({from: from, to: to});

                req = $.ajax({
                    url: url,
                    dataType: "json",
                    success: function(resp) {
                        onSuccess(resp, fromPage, toPage);
                    },
                    error : function () {
                        onError(fromPage, toPage);
                    }
                });
                req.fromPage = fromPage;
                req.toPage = toPage;
            }, 50);
        }


        function onError(fromPage, toPage) {
            //alert("error loading pages " + fromPage + " to " + toPage);
        }

        function onSuccess(resp, fromPage, toPage) {
            var from = fromPage * pagesize, to = from + resp.data.length;
            data.length = resp.data.length;

            for (var i = 0; i < resp.data.length; i++) {
                data[i] = resp.data[i];

                // this is used to draw the row status icon
                data[i].rowStatus = 'ok';

                // store the original data here to help "revert" functionality
                data[i].org = {};
                $.extend(true, data[i].org, data[i]);
            }

            req = null;

            totalRows = parseInt(resp.total);

            onPagingInfoChanged.notify(getPagingInfo(), null, self);
            onDataLoaded.notify({from: 0, to: data.length});
        }


        function reloadData(from, to) {
            for (var i = from; i <= to; i++)
                delete data[i];

            ensureData(from, to);
        }


        function setSort(column, dir) {
            sortcol = column;
            sortdir = dir;
            clear();
        }

        function setSearch(str) {
            searchstr = str;
            clear();
        }

        function setPagingOptions(args) {
            if (args.pageSize != undefined) {
                pagesize = args.pageSize;
                pagenum = Math.min(pagenum, Math.ceil(totalRows / pagesize));
                if (pagenum > 1) pagenum--;
            }

            if (args.pageNum != undefined) {
                pagenum = Math.min(args.pageNum, Math.ceil(totalRows / pagesize));
            }

            onPagingInfoChanged.notify(getPagingInfo(), null, self);

            ensureData(pagenum * pagesize, pagenum * pagesize + pagesize);
        }

        function getPagingInfo() {
            return {pageSize: pagesize, pageNum: pagenum, totalRows: totalRows};
        }

        init();

        return {
            // properties
            "data": data,

            // methods
            "clear": clear,
            "isDataLoaded": isDataLoaded,
            "ensureData": ensureData,
            "reloadData": reloadData,
            "setSort": setSort,
            "setSearch": setSearch,

            "setPagingOptions": setPagingOptions,
            "getPagingInfo": getPagingInfo,

            // events
            "onDataLoading": onDataLoading,
            "onDataLoaded": onDataLoaded,
            "onPagingInfoChanged": onPagingInfoChanged
        };
    }

    // Slick.Data.RemoteModel
    $.extend(true, window, { Slick: { Data: { RemoteModel: RemoteModel }}});
})(jQuery);