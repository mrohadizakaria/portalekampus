<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProdiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   
        Schema::defaultStringLength(191);
        Schema::create('pe3_prodi', function (Blueprint $table) {
            $table->string('kode_prodi',5);                        
            $table->string('kode_fakultas',10)->nullable();                        
            $table->string('nama_prodi',50);
            $table->string('config')->nullable();
            
            $table->primary('kode_prodi');              
            $table->index('kode_fakultas'); 
            
            $table->foreign('kode_fakultas')
                ->references('kode_fakultas')
                ->on('pe3_fakultas')
                ->onDelete('cascade') 
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
        Schema::dropIfExists('pe3_prodi');
    }
}
