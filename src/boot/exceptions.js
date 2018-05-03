
define(function () {

    //COMO FUNCION
    return function (src) {
        if (!src) {
            src = "";
        }

        /* AJAX */
        $(document).ajaxError(function (event, jqxhr, settings, thrownError) {
            //console.log(event, jqxhr, settings, thrownError);
            errorHandle(jqxhr.responseText, jqxhr.status);
        });

        /* AXIOS */
        axios.interceptors.response.use(function (response) {
            return response;
        }, function (error) {
            errorHandle(error.response.data, error.response.status, error.response.statusText);
            return Promise.reject(error);
        });
        
        /* REQUIRE */
        if (window.require) {
            requirejs.config({
                config: {
                    text: {
                        onXhr: function (xhr, url) {
                            xhr.onload = function (progressEvent) {
                                if (xhr.status >= 400) {
                                    errorHandle(xhr.responseText, xhr.status, xhr.statusText);
                                }
                            };
                        }
                    }
                }
            });
        }
        
    };
    
    // MÉTODOS PRIVADOS
    function errorHandle(response, status, thrownError) {
        
        // UNAUTHORIZED
        if (401 == status) {

            // LOGIN MODAL
            require(["vue!modules/modal.html"], function (Component) {

                // REMOVE ANY MODAL
                $(".modal").remove();
                $('.modal-backdrop').remove();

                var component = new Component();

                // MODAL ESTÁTICO
                component.data = component.data();
                component.data.options = {
                    backdrop: 'static',
                    keyboard: false
                };

                var vm = new Vue(component);

                var div = $("<div>").appendTo("body")[0];
                vm.$mount(div);

                $(vm.$el).find(".modal-body").css({
                    padding: 0
                });
                vm.page = "modules/views/login/login.html";
            });

            return;
        }

        var options = {
            type: 'danger'
        }

        $.notify("<b>" + thrownError + "</b>: " + response, options);
    }
    
});
