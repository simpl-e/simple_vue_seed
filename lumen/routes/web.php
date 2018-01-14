<?php

$router->post('{controller}@{method}', function(\Illuminate\Http\Request $request, $controller, $method) {
    return app("App\\Http\\Controllers\\$controller")->$method($request);
});
