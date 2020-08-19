<?php

use Illuminate\Database\Seeder;

use App\Models\System\ConfigurationModel;
class ProgramStudiTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::statement('DELETE FROM pe3_prodi');
        \DB::statement('ALTER TABLE pe3_prodi AUTO_INCREMENT = 1;');       
        
    }
}
