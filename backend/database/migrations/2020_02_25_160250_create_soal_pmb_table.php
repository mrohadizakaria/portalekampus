<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSoalPmbTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   
        Schema::defaultStringLength(191);

        Schema::create('pe3_soal', function (Blueprint $table) {                                                                  
            $table->uuid('id')->primary();                        
            $table->text('soal');            
            $table->string('gambar',11);            
            $table->unsignedInteger('prodi_id')->nullable();            
            $table->timestamps();   
            
            $table->foreign('prodi_id')
                ->references('id')
                ->on('pe3_prodi')
                ->onDelete('set null') 
                ->onUpdate('cascade'); 
                
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pe3_soal');
    }
}
