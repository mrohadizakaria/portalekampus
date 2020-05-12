<?php

namespace App\Http\Controllers\DMaster;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\DMaster\ProvinsiModel;
class ProvinsiController extends Controller {  
    /**
     * daftar provinsi
     */
    public function index(Request $request)
    {
        $provinsi=ProvinsiModel::all();
        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',  
                                    'provinsi'=>$provinsi,                                                                                                                                   
                                    'message'=>'Fetchs data provinsi berhasil.'
                                ],200);     
    }
    /**
     * daftar kabupaten
     */
    public function kabupaten(Request $request,$id)
    {
        $provinsi=ProvinsiModel::find($id);
        if (is_null($provinsi))
        {
            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',                
                                    'message'=>"Fetch data kabupaten berdasarkan id provinsi gagal"
                                ],200); 
        }
        else
        {
            $kabupaten = $provinsi->kabupaten;
            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'fetchdata',  
                                        'kabupaten'=>$kabupaten,                                                                                                                                   
                                        'message'=>'Fetchs data kabupaten berdasarkan id provinsi berhasil.'
                                    ],200);     

        }
    }
}