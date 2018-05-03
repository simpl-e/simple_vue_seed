/* globals localStorage, Vue */

define(function () {

    //COMO FUNCION
    return function () {

        /* SIN USAR VUEX */
        //https://vuejs.org/v2/guide/state-management.html
        return {
            state: {
                kprimas: {}
            },
            get: function (key) {
                if (this.state[key]) {
                    return this.state[key];
                }

                var json = localStorage.getItem(key) || null;
                if (json) {
                    var value = null;
                    try {
                        value = JSON.parse(json);
                    } catch (e) {
                        //
                    }

                    Vue.set(this.state, key, value);
                    return value;
                }
            },
            set: function (key, value) {
                Vue.set(this.state, key, value);
                var json = JSON.stringify(value);
                localStorage.setItem(key, json);
            }
        };

        /* CON VUEX */
        // return new Vuex.Store({
        //     state: {
        //         //
        //     },
        //     mutations: {
        //         set(state, data) {
        //             console.log("set", state, data);
        //             for (var key in data) {
        //                 state[key] = data[key];
        //             }
        //         }
        //     },
        //     actions: {
        //         get: function (context, key) {
        //             if (this.state[key]) {
        //                 return this.state[key];
        //             }

        //             var json = localStorage.getItem(key) || null;
        //             if (json) {
        //                 var value = null;
        //                 try {
        //                     value = JSON.parse(json);
        //                 } catch (e) {
        //                     //
        //                 }

        //                 //Vue.set(this.state, key, value);
        //                 context.commit("set", [key, value]);
        //                 return value;
        //             }
        //         },
        //         set: function (context, data) {
        //             console.log("set", context, data)
        //             //Vue.set(this.state, key, value);
        //             context.commit("set", data);
        //             for (var key in data) {
        //                 var json = JSON.stringify(data[key]);
        //                 localStorage.setItem(key, json);
        //             }
        //         }
        //     }
        // });

    };
});
