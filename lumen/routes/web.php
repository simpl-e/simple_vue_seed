<?php

//error_reporting(E_ALL);
//ini_set('display_errors', '1');

$router->post('{controller}@{method}', function(\Illuminate\Http\Request $request, $controller, $method) {
    return app("App\\Http\\Controllers\\$controller")->$method($request);
});
