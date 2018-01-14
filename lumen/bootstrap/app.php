<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once __DIR__ . '/../vendor/autoload.php';

(new Dotenv\Dotenv(__DIR__ . '/../'))->load();

$app = new Laravel\Lumen\Application(
        realpath(__DIR__ . '/../')
);

$app->withFacades();
$app->withEloquent();


$app->singleton(
        Illuminate\Contracts\Debug\ExceptionHandler::class, Laravel\Lumen\Exceptions\Handler::class
);

$app->singleton(
        Illuminate\Contracts\Console\Kernel::class, Laravel\Lumen\Console\Kernel::class
);


$app->router->group(['namespace' => 'App\Http\Controllers'], function ($router) {
    require __DIR__ . '/../routes/web.php';
});

return $app;
