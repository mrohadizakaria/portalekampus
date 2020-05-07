<?php

namespace App\Http\Controllers\System;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\System\SettingModel;


class UIController extends Controller {    
    /**
     * digunakan untuk mendapatkan Identitas Perguruan Tinggi
     */
    public function index ()
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
                                    'message'=>'Fetch data identitas berhasil diperoleh'
                                ],200);  
    }

    /**
     * digunakan untuk mendapatkan Identitas Perguruan Tinggi
     */
    public function getNamaPTAlias ()
    {
        $data = SettingModel::find(5);
        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',
                                    'result'=>$data->value,
                                    'message'=>'Fetch data alias nama pt berhasil diperoleh'
                                ],200);  
    }
}