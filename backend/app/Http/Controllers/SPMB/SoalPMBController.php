<?php

namespace App\Http\Controllers\SPMB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\SPMB\SoalPMBModel;

class SoalPMBController extends Controller {  
    /**
     * daftar soal
     */
    public function index(Request $request)
    {
        $soal=SoalPMBModel::where('ta',2020)
                            ->where('semester',1)
                            ->get();

        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',  
                                    'soal'=>$soal,                                                                                                                                   
                                    'message'=>'Fetch data soal pmb berhasil.'
                                ],200);     
    }    
}