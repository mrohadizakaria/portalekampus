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
    $router->post('/auth/login',['uses'=>'AuthController@login','as'=>'auth.login']);
});

$router->group(['prefix'=>'v3','middleware'=>'auth:api'], function () use ($router)
{   
    //authentication    
    $router->post('/auth/logout',['uses'=>'AuthController@logout','as'=>'auth.logout']);
    $router->get('/auth/refresh',['uses'=>'AuthController@refresh','as'=>'auth.refresh']);
    $router->get('/auth/me',['uses'=>'AuthController@me','as'=>'auth.me']);
});
