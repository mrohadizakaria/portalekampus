<?php

use Illuminate\Database\Seeder;

use Carbon\Carbon;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::statement('DELETE FROM roles');
        \DB::statement('ALTER TABLE roles AUTO_INCREMENT = 1;');
        \DB::table('roles')->insert([
            [
                'name'=>'superadmin',
                'guard_name'=>'api',
                'created_at'=>Carbon::now(),
                'updated_at'=>Carbon::now()
            ], 
            [
                'name'=>'manajemen',
                'guard_name'=>'api',
                'created_at'=>Carbon::now(),
                'updated_at'=>Carbon::now()
            ],    
            [
                'name'=>'pmb',
                'guard_name'=>'api',
                'created_at'=>Carbon::now(),
                'updated_at'=>Carbon::now()
            ],   
            [
                'name'=>'keuangan',
                'guard_name'=>'api',
                'created_at'=>Carbon::now(),
                'updated_at'=>Carbon::now()
            ],    
            [
                'name'=>'operatornilai',
                'guard_name'=>'api',
                'created_at'=>Carbon::now(),
                'updated_at'=>Carbon::now()
            ], 
            [
                'name'=>'dosen',
                'guard_name'=>'api',
                'created_at'=>Carbon::now(),
                'updated_at'=>Carbon::now()
            ],             
            [
                'name'=>'dosenwali',
                'guard_name'=>'api',
                'created_at'=>Carbon::now(),
                'updated_at'=>Carbon::now()
            ],             
            [
                'name'=>'mahasiswa',
                'guard_name'=>'api',
                'created_at'=>Carbon::now(),
                'updated_at'=>Carbon::now()
            ],             
            [
                'name'=>'mahasiswabaru',
                'guard_name'=>'api',
                'created_at'=>Carbon::now(),
                'updated_at'=>Carbon::now()
            ],             
            [
                'name'=>'orangtuawali',
                'guard_name'=>'api',
                'created_at'=>Carbon::now(),
                'updated_at'=>Carbon::now()
            ],             
        ]);
    }
}
