/* ROUTER BASADO EN HASH '#view=[...]' */

window.router = {
    src: window.src ? window.src : "src"
    ,
    update: function (def) {
        var view = this._getViewName(def);
        this.load(view);
    }
    ,
    load: function (view) {
        if (!view) {
            return;
        }

        var url = window.src + '/modules/views/' + view + '/' + view + '.html';

        require(["vue!" + url], function (view) {
            window.app = new Vue(view).$mount('#app > *:first-child');
        });
    }
    ,
    //GET VIEW MODULE
    _getViewName: function (def) {

        var hash = this._getUrlParameter(location.hash, "view") || def;
        if (!hash) {
            return;
        }

        //AÑADIR CLASE 'view_'
        //https://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard
        $("html").removeClass(function (index, className) {
            return (className.match(/(^|\s)view_\S+/g) || []).join(' ');
        });
        $("html").addClass("view_" + hash);

        return hash;
    }
    ,
    //GET URL PARAMETER
    //https://stackoverflow.com/questions/19491336/get-url-parameter-jquery-or-how-to-get-query-string-values-in-js
    _getUrlParameter: function (str, sParam) {
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
};

define(function () {
    //COMO FUNCION
    return function () {

        //HASH CHANGE EVENT
        $(window).on("hashchange", function () {
            window.router.update();
        });

        //AUTO-INIT:
        window.router.update('home');
    };
});
