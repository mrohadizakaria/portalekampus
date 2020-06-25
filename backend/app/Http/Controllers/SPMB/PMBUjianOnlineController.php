<?php

namespace App\Http\Controllers\SPMB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\SPMB\FormulirPendaftaranModel;
use App\Models\SPMB\SoalPMBModel;
use App\Models\SPMB\JawabanUjianPMBModel;

use Ramsey\Uuid\Uuid;

class PMBUjianOnlineController extends Controller {  
    /**
     * daftar soal
     */
    public function index(Request $request,$id)
    {
        $this->hasPermissionTo('SPMB-PMB-UJIAN-ONLINE_BROWSE');        
        $formulir=FormulirPendaftaranModel::find($id);
        if (is_null($formulir))
        {
            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'fetchdata',                
                                        'message'=>["Formulir Pendaftaran dengan ID ($id) gagal diperoleh"]
                                    ],422); 
        }
        else
        {
            $soal=SoalPMBModel::select(\DB::raw('id,soal'))
                            ->whereNotIn('id',function($query) use ($id){
                                $query->select('soal_id')
                                        ->from('pe3_jawaban_ujian')
                                        ->where('user_id',$id);
                            })
                            ->inRandomOrder()
                            ->first();
            
            if (is_null($soal))
            {
                $status=0;
                $soal='';
                $jawaban=[];
            }
            else
            {
                $status=1;
                $jawaban=$soal->jawabanUjian;
            }           
            return Response()->json([
                                    'status'=>$status,
                                    'pid'=>'fetchdata',  
                                    'soal'=>$soal,     
                                    'jawaban'=>$jawaban,                                                                                                                              
                                    'message'=>'Fetch data soal pmb berhasil.'
                                ],200);     
        }        
    }  
    /**
     * digunakan untuk menyimpan jawaban ujian
     */
    public function store (Request $request)
    {
        $this->validate($request,[
                                  'user_id'=>'required|exists:users,id',
                                  'soal_id'=>'required|exists:pe3_soal,id',
                                  'jawaban_id'=>'required|exists:pe3_jawaban_soal,id',
                                ]);
        
        
        $jawaban_ujian = JawabanUjianPMBModel::create([
            'id'=>Uuid::uuid4()->toString(),
            'user_id'=>$request->input('user_id'),
            'soal_id'=>$request->input('soal_id'),
            'jawaban_id'=>$request->input('jawaban_id'),
        ]);
        
        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'store',                                                                                                                                    
                                    'message'=>'Data Jawaban Ujian berhasil disimpan.'
                                ],200); 
    }    
}