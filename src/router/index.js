
/* ROUTER BASADO EN HASH 'view=[...]' */

(function () {

    function view(hash) {
        if (!hash) {
            hash = getUrlParameter(location.hash, "view");
        }

        if (!hash) {
            hash = "home";
        }

        //A�ADIR CLASE 'view_'
        //https://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard
        $("html").removeClass(function (index, className) {
            return (className.match(/(^|\s)view_\S+/g) || []).join(' ');
        });
        $("html").addClass("view_" + hash);

        return 'src/modules/views/' + hash + '/' + hash + '.html';
    }

    $(window).on("hashchange", function () {
        hashChange();
    });

    function hashChange() {
        var url = view();
        require(["vue!" + url], function (view) {
            window.app = new Vue(view).$mount('#app > *');
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
