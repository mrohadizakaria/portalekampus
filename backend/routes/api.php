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

    $router->get('/setting/identitas/namaptalias',['uses'=>'System\IdentitasController@getNamaPTAlias','as'=>'identitas.namaptalias']);
    $router->post('/auth/login',['uses'=>'AuthController@login','as'=>'auth.login']);
});

$router->group(['prefix'=>'v3','middleware'=>'auth:api'], function () use ($router)
{   
    //authentication    
    $router->post('/auth/logout',['uses'=>'AuthController@logout','as'=>'auth.logout']);
    $router->get('/auth/refresh',['uses'=>'AuthController@refresh','as'=>'auth.refresh']);
    $router->get('/auth/me',['uses'=>'AuthController@me','as'=>'auth.me']);

    //setting - permissions
    $router->get('/setting/permissions',['middleware'=>['role:superadmin|manajemen'],'uses'=>'System\PermissionsController@index','as'=>'permissions.index']);
    $router->post('/setting/permissions/store',['middleware'=>['role:superadmin'],'uses'=>'System\PermissionsController@store','as'=>'permissions.store']);    
    $router->delete('/setting/permissions/{id}',['middleware'=>['role:superadmin'],'uses'=>'System\PermissionsController@destroy','as'=>'permissions.destroy']);

    //setting - roles
    $router->get('/setting/roles',['middleware'=>['role:superadmin'],'uses'=>'System\RolesController@index','as'=>'roles.index']);
    $router->post('/setting/roles/store',['middleware'=>['role:superadmin'],'uses'=>'System\RolesController@store','as'=>'roles.store']);
    $router->post('/setting/roles/storerolepermissions',['middleware'=>['role:superadmin'],'uses'=>'System\RolesController@storerolepermissions','as'=>'roles.storerolepermissions']);
    $router->post('/setting/roles/revokerolepermissions',['middleware'=>['role:superadmin'],'uses'=>'System\RolesController@revokerolepermissions','as'=>'users.revokerolepermissions']);
    $router->put('/setting/roles/{id}',['middleware'=>['role:superadmin'],'uses'=>'System\RolesController@update','as'=>'roles.update']);
    $router->delete('/setting/roles/{id}',['middleware'=>['role:superadmin'],'uses'=>'System\RolesController@destroy','as'=>'roles.destroy']);    
    $router->get('/setting/roles/{id}/permission',['middleware'=>['role:superadmin'],'uses'=>'System\RolesController@rolepermissions','as'=>'roles.permission']); 

    //setting - users
    $router->get('/setting/users',['middleware'=>['role:superadmin'],'uses'=>'System\UsersController@index','as'=>'users.index']);
    $router->post('/setting/users/store',['middleware'=>['role:superadmin'],'uses'=>'System\UsersController@store','as'=>'users.store']);
    $router->post('/setting/users/uploadfoto/{id}',['middleware'=>['role:superadmin|bapelitbang|opd|pptk'],'uses'=>'System\UsersController@uploadfoto','as'=>'users.uploadfoto']);
    $router->post('/setting/users/resetfoto/{id}',['middleware'=>['role:superadmin|bapelitbang|opd|pptk'],'uses'=>'System\UsersController@resetfoto','as'=>'users.resetfoto']);
    $router->post('/setting/users/storeuserpermissions',['middleware'=>['role:superadmin|bapelitbang|opd'],'uses'=>'System\UsersController@storeuserpermissions','as'=>'users.storeuserpermissions']);
    $router->post('/setting/users/revokeuserpermissions',['middleware'=>['role:superadmin|bapelitbang|opd'],'uses'=>'System\UsersController@revokeuserpermissions','as'=>'users.revokeuserpermissions']);
    $router->put('/setting/users/{id}',['middleware'=>['role:superadmin'],'uses'=>'System\UsersController@update','as'=>'users.update']);
    $router->delete('/setting/users/{id}',['middleware'=>['role:superadmin'],'uses'=>'System\UsersController@destroy','as'=>'users.destroy']);    
    $router->get('/setting/users/{id}/permission',['middleware'=>['role:superadmin|bapelitbang|opd'],'uses'=>'System\UsersController@userpermissions','as'=>'users.permission']);    
    $router->get('/setting/users/{id}/opd',['middleware'=>['role:superadmin|bapelitbang|opd|pptk'],'uses'=>'System\UsersController@useropd','as'=>'users.opd']);    

    //setting - users pmb
    $router->get('/setting/userspmb',['middleware'=>['role:superadmin|bapelitbang|opd'],'uses'=>'System\UsersPMBController@index','as'=>'userspmb.index']);
    $router->post('/setting/userspmb/store',['middleware'=>['role:superadmin|bapelitbang|opd'],'uses'=>'System\UsersPMBController@store','as'=>'userspmb.store']);
    $router->put('/setting/userspmb/{id}',['middleware'=>['role:superadmin|bapelitbang|opd'],'uses'=>'System\UsersPMBController@update','as'=>'userspmb.update']);
    $router->put('/setting/userspmb/{id}',['middleware'=>['role:superadmin|bapelitbang|opd'],'uses'=>'System\UsersPMBController@update','as'=>'userspmb.update']);
    $router->delete('/setting/userspmb/{id}',['middleware'=>['role:superadmin|bapelitbang|opd'],'uses'=>'System\UsersPMBController@destroy','as'=>'userspmb.destroy']);    
    
});
