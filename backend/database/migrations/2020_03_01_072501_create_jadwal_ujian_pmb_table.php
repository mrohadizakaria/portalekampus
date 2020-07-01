<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJadwalUjianPmbTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   
        Schema::defaultStringLength(191);
        Schema::create('pe3_jadwal_ujian_pmb', function (Blueprint $table) {
            $table->uuid('id')->primary();                                    
            $table->string('nama_kegiatan');
            $table->datetime('tanggal_ujian');
            $table->datetime('tanggal_akhir_daftar');
            $table->uuid('ruangkelas_id');
            $table->year('ta');
            $table->tinyInteger('idsmt')->default(1);
            $table->boolean('status')->default(0);

            $table->timestamps();
            $table->index('ruangkelas_id');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pe3_jadwal_ujian_pmb');
    }
}
