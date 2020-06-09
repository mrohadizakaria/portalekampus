<?php

namespace App\Http\Controllers\SPMB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SoalPMBController extends Controller {  
    /**
     * daftar soal
     */
    public function index(Request $request)
    {
        $soal=[];

        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',  
                                    'prodi'=>$soal,                                                                                                                                   
                                    'message'=>'Fetch data soal pmb berhasil.'
                                ],200);     
    }    
}