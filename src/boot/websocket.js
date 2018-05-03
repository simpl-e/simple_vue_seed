/* globals $, define, Echo */

define(["https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js",
    "https://cdn.jsdelivr.net/npm/laravel-echo@1.3.4/dist/echo.min.js"
], function (io) {

    //COMO FUNCION
    return function (url) {

        //https://laravel.com/docs/5.6/broadcasting
        var echo = new Echo({
            broadcaster: 'socket.io',
            host: url,
            client: io
        });

        PUBLIC CHANNELS:
        echo.channel('public').listen('PublicEvent', function (msg) {
            console.log('MessageEvent', msg);
            require(function() {
                $.notify(msg);
            });
        });

        //AUTH CHANNELS
        var startWebsocket = function (token) {
            //ADD TOKEN
            echo.connector.options.auth = {
                headers: {
                    'Authorization': token
                }
            };

            //PRESENCE CHANNELS:
            echo.join("presence")
                .listen('PresenceEvent', function (msg) {
                    console.log('PresenceEvent', msg);
                    $.notify(msg);
                })
                .here(function (users) {
                    this.users = users;
                    console.log("join users", users);
                })
                .joining(function (user) {
                    this.users.push(user);
                    console.log("joining user", user);
                })
                .leaving(function (user) {
                    console.log("leaving user", user);
                });

            //PRIVATE CHANNELS:
            var id = getCookie('id');
            if (!id) {
                $.notify("missing getCookie('id');");
                return;
            }

            echo.private('private.' + id).listen('PrivateEvent', function (data) {
                console.log('UserEvent', data);

                if (data.msg) {
                    //CONVERTIR EN ARRAY SI NO LO ES
                    if (data.msg.constructor !== Array) {
                        data.msg = [data.msg];
                    }

                    //GET FULL ERROR
                    for (var i = 0; i < data.msg.length; i++) {
                        var msg = data.msg[i];
                        $.notify(msg);
                    }
                }

                if (data.state) {
                    for (var key in data.state) {
                        var extend = $.extend(true, window.store.state[key], data.state[key]);
                        window.globals.set(key, extend);
                    }
                }

                // TODO: PORQUE NO FUNCIONA AQUÍ EL BINDING DE VUE AUTOMÁTICAMENTE?
                //ACTUALIZAR TODO VUE
                window.vm.$forceUpdate();
                for (var i = 0; i < window.vm.$children.length; i++) {
                    window.vm.$children[i].$forceUpdate();
                }

            });
        };

        //IF ALREADY LOGED
        var token = getCookie('Authorization');
        if (token) {
            token = token.replace("+", " ");
            startWebsocket(token);
        }

        //PUBLIC:
        window.echo = echo;
        window.startWebsocket = startWebsocket;
    };
});
