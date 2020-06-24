<?php

namespace App\Http\Controllers\SPMB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\SPMB\SoalPMBModel;
use App\Models\SPMB\JawabanSoalPMBModel;

use Ramsey\Uuid\Uuid;

class PMBUjianOnlineController extends Controller {  
    /**
     * daftar soal
     */
    public function index(Request $request)
    {
        $this->hasPermissionTo('SPMB-PMB-UJIAN-ONLINE_BROWSE');

        $soal=SoalPMBModel::select(\DB::raw('id,soal'))
                            ->inRandomOrder()
                            ->first();
        $jawaban=$soal->jawabanUjian;
        return Response()->json([
                                'status'=>1,
                                'pid'=>'fetchdata',  
                                'soal'=>$soal,     
                                'jawaban'=>$jawaban,                                                                                                                              
                                'message'=>'Fetch data soal pmb berhasil.'
                            ],200);     
    }      
}