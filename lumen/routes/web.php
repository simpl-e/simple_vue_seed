<?php

$router->post('{controller}@{method}', function(\Illuminate\Http\Request $request, $controller, $method) {
    return app("App\\Http\\Controllers\\" . ucfirst($controller) . "Controller")->$method($request);
});
