<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   
        \DB::statement('DELETE FROM users');
        \DB::statement('ALTER TABLE users AUTO_INCREMENT = 1;');
        $user=User::create([
            'username'=>'admin',
            'password'=>Hash::make('1234'),                
            'name'=>'Mochammad Rizki Romdoni',                
            'nomor_hp'=>'081214553388',                
            'email'=>'support@yacanet.com',                
            'theme'=>'default',
            'email_verified_at'=>Carbon::now(),
            'isdeleted'=>false,
            'created_at'=>Carbon::now(),
            'updated_at'=>Carbon::now()
        ]);  
        
        $user->assignRole('superadmin');
    }
}
