<?php

namespace App\Http\Controllers\System;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\System\SettingModel;


class IdentitasController extends Controller {    
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