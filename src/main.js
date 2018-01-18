
// Start loading the main app file. Put all of your application logic in there.

/* DEFINIR GLOBALES */
window.server_url = "";

require.config({
    waitSeconds: 0, //prevent timeout by requirejs
    paths: {
        text: 'src/libs/requirejs/text',
        propertyParser: 'src/libs/requirejs/propertyParser', //font plugin needed!
        font: 'src/libs/requirejs/font',
        css: 'src/libs/requirejs/css.min',
        vue: 'src/libs/requirejs/requirejs-vue'
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
