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
    //pendaftaran mahasiswa baru
    $router->post('/spmb/pmb/store',['uses'=>'SPMB\PMBController@store','as'=>'pmb.store']);
    $router->post('/spmb/pmb/konfirmasi',['uses'=>'SPMB\PMBController@konfirmasi','as'=>'pmb.konfirmasi']);

    $router->get('/setting/identitas/namaptalias',['uses'=>'Setting\IdentitasController@getNamaPTAlias','as'=>'identitas.namaptalias']);
    $router->post('/auth/login',['uses'=>'AuthController@login','as'=>'auth.login']);
});

$router->group(['prefix'=>'v3','middleware'=>'auth:api'], function () use ($router)
{   
    //authentication    
    $router->post('/auth/logout',['uses'=>'AuthController@logout','as'=>'auth.logout']);
    $router->get('/auth/refresh',['uses'=>'AuthController@refresh','as'=>'auth.refresh']);
    $router->get('/auth/me',['uses'=>'AuthController@me','as'=>'auth.me']);

    //setting - permissions
    $router->get('/setting/permissions',['middleware'=>['role:superadmin|manajemen'],'uses'=>'Setting\PermissionsController@index','as'=>'permissions.index']);
    $router->post('/setting/permissions/store',['middleware'=>['role:superadmin'],'uses'=>'Setting\PermissionsController@store','as'=>'permissions.store']);    
    $router->delete('/setting/permissions/{id}',['middleware'=>['role:superadmin'],'uses'=>'Setting\PermissionsController@destroy','as'=>'permissions.destroy']);

    //setting - roles
    $router->get('/setting/roles',['middleware'=>['role:superadmin'],'uses'=>'Setting\RolesController@index','as'=>'roles.index']);
    $router->post('/setting/roles/store',['middleware'=>['role:superadmin'],'uses'=>'Setting\RolesController@store','as'=>'roles.store']);
    $router->post('/setting/roles/storerolepermissions',['middleware'=>['role:superadmin'],'uses'=>'Setting\RolesController@storerolepermissions','as'=>'roles.storerolepermissions']);
    $router->post('/setting/roles/revokerolepermissions',['middleware'=>['role:superadmin'],'uses'=>'Setting\RolesController@revokerolepermissions','as'=>'users.revokerolepermissions']);
    $router->put('/setting/roles/{id}',['middleware'=>['role:superadmin'],'uses'=>'Setting\RolesController@update','as'=>'roles.update']);
    $router->delete('/setting/roles/{id}',['middleware'=>['role:superadmin'],'uses'=>'Setting\RolesController@destroy','as'=>'roles.destroy']);    
    $router->get('/setting/roles/{id}/permission',['middleware'=>['role:superadmin'],'uses'=>'Setting\RolesController@rolepermissions','as'=>'roles.permission']); 

    //setting - users
    $router->get('/setting/users',['middleware'=>['role:superadmin'],'uses'=>'Setting\UsersController@index','as'=>'users.index']);
    $router->post('/setting/users/store',['middleware'=>['role:superadmin'],'uses'=>'Setting\UsersController@store','as'=>'users.store']);
    $router->post('/setting/users/uploadfoto/{id}',['middleware'=>['role:superadmin|bapelitbang|opd|pptk'],'uses'=>'Setting\UsersController@uploadfoto','as'=>'users.uploadfoto']);
    $router->post('/setting/users/resetfoto/{id}',['middleware'=>['role:superadmin|bapelitbang|opd|pptk'],'uses'=>'Setting\UsersController@resetfoto','as'=>'users.resetfoto']);
    $router->post('/setting/users/storeuserpermissions',['middleware'=>['role:superadmin|bapelitbang|opd'],'uses'=>'Setting\UsersController@storeuserpermissions','as'=>'users.storeuserpermissions']);
    $router->post('/setting/users/revokeuserpermissions',['middleware'=>['role:superadmin|bapelitbang|opd'],'uses'=>'Setting\UsersController@revokeuserpermissions','as'=>'users.revokeuserpermissions']);
    $router->put('/setting/users/{id}',['middleware'=>['role:superadmin'],'uses'=>'Setting\UsersController@update','as'=>'users.update']);
    $router->delete('/setting/users/{id}',['middleware'=>['role:superadmin'],'uses'=>'Setting\UsersController@destroy','as'=>'users.destroy']);    
    $router->get('/setting/users/{id}/permission',['middleware'=>['role:superadmin|bapelitbang|opd'],'uses'=>'Setting\UsersController@userpermissions','as'=>'users.permission']);    
    $router->get('/setting/users/{id}/opd',['middleware'=>['role:superadmin|bapelitbang|opd|pptk'],'uses'=>'Setting\UsersController@useropd','as'=>'users.opd']);    
});
