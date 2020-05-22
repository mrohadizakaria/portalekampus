<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(TATableSeeder::class);        
        $this->call(ConfigurationTableSeeder::class);
        $this->call(JenjangStudiTableSeeder::class);
        $this->call(PermissionsTableSeeder::class);
        $this->call(RolesTableSeeder::class);        
        $this->call(UsersTableSeeder::class);        
        $this->call(UsersTableSeeder::class);        
        $this->call(PersyaratanTableSeeder::class);                
    }
}
