
window.server = "../lumen/public/";

require.config({
    waitSeconds: 0, //prevent timeout by requirejs
    paths: {
        text: 'lib/requirejs/text',
        propertyParser: 'lib/requirejs/propertyParser', //font plugin needed!
        font: 'lib/requirejs/font',
        css: 'lib/requirejs/css.min',
//        vue: 'lib/requirejs/require-vuejs.min'
        vue: 'lib/requirejs/requirejs-vue'
    },
    config: {
        text: {
            useXhr: function (url, protocol, hostname, port) {
                // allow cross-domain requests - remote server allows CORS
                return true;
            }
        }
    }
});


// Start loading the main app file. Put all of your application logic in there.
//requirejs(['vue!pages/home/home.html']);

(function () {

    function page(hash) {
        if (!hash) {
            hash = getUrlParameter(location.hash, "page");
        }

        if (!hash) {
            hash = "home";
        }

        return 'pages/' + hash + '/' + hash + '.html';
    }

    $(window).on("hashchange", function () {
        hashChange();
    });

    function hashChange() {
        //$(".modal").modal("hide");

        var url = page();
        require(["vue!" + url], function (page) {
            window.app = new Vue(page).$mount('#content > *');
        });
    }

    hashChange();

    //https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
    function getUrlParameter(str, sParam) {
        var sPageURL = decodeURIComponent(str.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }

})();
