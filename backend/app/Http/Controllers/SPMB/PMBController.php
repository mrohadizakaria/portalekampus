<?php

namespace App\Http\Controllers\SPMB;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Helpers\Helper;
use Spatie\Permission\Models\Role;
use GuzzleHttp\Client;
class PMBController extends Controller {         
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {           
        $this->hasPermissionTo('SPMB-PMB_BROWSE');
        $data = User::role('superadmin')->get();
        return Response()->json([
                                'status'=>1,
                                'pid'=>'fetchdata',
                                'users'=>$data,
                                'message'=>'Fetch data users berhasil diperoleh'
                            ],200);  
    }    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name'=>'required',            
            'email'=>'required|string|email|unique:users',
            'nomor_hp'=>'required|unique:users',
            'username'=>'required|string|unique:users',
            'password'=>'required',
            'captcha_response'=>[
                                'required',
                                function ($attribute, $value, $fail) 
                                {
                                    $client = new Client ();
                                    $response = $client->post(
                                        'https://www.google.com/recaptcha/api/siteverify',
                                        ['form_params'=>
                                            [
                                                'secret'=>config('captcha.RECAPTCHA_PRIVATE_KEY'),
                                                'response'=>$value
                                            ]
                                        ]);    
                                    $body = json_decode((string)$response->getBody());
                                    if (!$body->success)
                                    {
                                        $fail('Token Google Captcha, salah !!!.');
                                    }
                                }
                            ]
        ]);
        $now = \Carbon\Carbon::now()->toDateTimeString();        
        $user=User::create([
            'name'=>$request->input('name'),
            'email'=>$request->input('email'),
            'username'=> $request->input('username'),
            'password'=>Hash::make($request->input('password')),
            'nomor_hp'=>$request->input('nomor_hp'),
            'email_verified_at'=>'',
            'theme'=>'default',            
            'created_at'=>$now, 
            'updated_at'=>$now
        ]);            
        $role='mahasiswabaru';   
        $user->assignRole($role);               
        
        \App\Models\Setting\ActivityLog::log($request,[
                                        'object' => 'App\Users', 
                                        'user_id' => $user->id, 
                                        'message' => 'Menambah mahasiswa baru ('.$user->username.') berhasil'
                                    ]);

        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'store',                                                                                                  
                                    'message'=>'Data Mahasiswa baru berhasil disimpan.'
                                ],200); 

    }           
}