<?php

namespace App\Http\Controllers\System;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\System\SettingModel;
use App\Models\DMaster\TAModel;


class UIController extends Controller {    
    /**
     * digunakan untuk mendapatkan Identitas Perguruan Tinggi
     */
    public function frontend ()
    {
        $setting = SettingModel::getCache();
        $captcha_public_key = $setting['captcha_public_key'];
        $tahun_pendaftaran = $setting['default_tahun_pendaftaran'];
        $identitas['nama_pt']=$setting['nama_pt'];
        $identitas['nama_pt_alias']=$setting['nama_pt_alias'];
        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',
                                    'captcha_public_key'=>$captcha_public_key,
                                    'tahun_pendaftaran'=>$tahun_pendaftaran,
                                    'identitas'=>$identitas,
                                    'message'=>'Fetch data ui untuk front berhasil diperoleh'
                                ],200);  
    }
    /**
     * digunakan untuk mendapatkan Identitas Perguruan Tinggi
     */
    public function admin ()
    {
        $setting = SettingModel::getCache();
        $daftar_ta=TAModel::all()->pluck('tahun_akademik','tahun');
        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',  
                                    'daftar_ta'=>$daftar_ta,                                  
                                    'message'=>'Fetch data ui untuk admin berhasil diperoleh'
                                ],200);  
    }
}