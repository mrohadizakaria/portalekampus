<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
*/

$router->get('/', function () use ($router) {
    return 'PortalEkampus API';
});

$router->group(['prefix'=>'v3'], function () use ($router)
{
    $router->get('/setting/identitas/namaptalias',['uses'=>'Setting\IdentitasController@getNamaPTAlias','as'=>'identitas.namaptalias']);
});
