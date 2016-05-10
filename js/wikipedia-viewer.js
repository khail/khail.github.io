$('#searchterm').keyup(
    function (e) {
        var q = $('#searchterm').val ();
        $.getJSON (
            'http://en.wikipedia.org/w/api.php?callback=?', {
                srsearch: q,
                action: 'query',
                list: 'search',
                format: 'json'
            },
            function (data) {
                $('#results').empty ();
                if ( q ) $('#results').append ('<h3>Results for <b>' + q + '</b>:</h3><br>');
                $.each(
                    data.query.search,
                    function (i, item) {
                        var theHref = 'http://en.wikipedia.org/wiki/' + item.title;
                        $('#results').append (
                            '<div><a class=\'article-title\' href=\'' + theHref + '\' target=\'_blank\'>' + item.title + '</a><br>' + item.snippet + '<br><br></div>'
                        );
                    }
                );
            }
        );
    }
);

$('#btn-random').click (
    function (e) {
        $.getJSON (
            'http://en.wikipedia.org/w/api.php?callback=?', {
                action: 'query',
                generator: 'random',
                grnnamespace: 0,
                format: 'json'
            },
            function (data) {
                $.each (
                    data.query.pages,
                    function (k, v) {
                        $.getJSON (
                            'http://en.wikipedia.org/w/api.php?callback=?', {
                                action: 'query',
                                prop: 'info',
                                pageids: v.pageid,
                                inprop: 'url',
                                format: 'json'
                            },
                            function (url) {
                                $('#results').empty ();
                                $('#results').append ('<h3>Random article:</h3><br>');
                                $.each (url.query.pages,
                                    function (key, page) {
                                        $('#results').append (
                                            '<a class=\'article-title\' href=\'' + page.fullurl + '\' target=\'_blank\'>' + page.title + '</a>'
                                        )
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }
);
