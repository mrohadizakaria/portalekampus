<?php

namespace App\Http\Controllers\SPMB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\SPMB\SoalPMBModel;
use App\Models\SPMB\JawabanSoalPMBModel;

use Ramsey\Uuid\Uuid;

class SoalPMBController extends Controller {  
    /**
     * daftar soal
     */
    public function index(Request $request)
    {
        $this->hasPermissionTo('SPMB-PMB-SOAL_BROWSE');

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
    /**
     * simpan soal baru
     */
    public function store(Request $request)
    {
        $this->hasPermissionTo('SPMB-PMB-SOAL_STORE');

        $this->validate($request, [           
            'soal'=>'required',
            'gambar'=>'required',
            'jawaban1'=>'required',
            'jawaban2'=>'required',
            'jawaban3'=>'required',
            'jawaban4'=>'required',
            'jawaban_benar'=>'required',
            'tahun_pendaftaran'=>'required',
            'semester_pendaftaran'=>'required'
        ]);
        
        $soal = \DB::transaction(function () use ($request){
            $now = \Carbon\Carbon::now()->toDateTimeString();                               
            $soal=SoalPMBModel::create([
                'id'=>Uuid::uuid4()->toString(),
                'soal'=>$request->input('soal'),
                'gambar'=>null,
                'ta'=> $request->input('tahun_pendaftaran'),
                'semester'=>$request->input('semester_pendaftaran'),
                'active'=>1,                  
                'created_at'=>$now, 
                'updated_at'=>$now
            ]);            
            $soal_id=$soal->id;
            JawabanSoalPMBModel::create([
                'id'=>Uuid::uuid4()->toString(),
                'soal_id'=>$soal_id,
                'jawaban'=>$request->input('jawaban1'),                
                'options'=>'{}',
                'status'=>$request->input('jawaban_benar')==1?true:false,
                'created_at'=>$now, 
                'updated_at'=>$now
            ]);
            JawabanSoalPMBModel::create([
                'id'=>Uuid::uuid4()->toString(),
                'soal_id'=>$soal_id,
                'jawaban'=>$request->input('jawaban2'),                
                'options'=>'{}',
                'status'=>$request->input('jawaban_benar')==2?true:false,
                'created_at'=>$now, 
                'updated_at'=>$now
            ]);
            JawabanSoalPMBModel::create([
                'id'=>Uuid::uuid4()->toString(),
                'soal_id'=>$soal_id,
                'jawaban'=>$request->input('jawaban3'),                
                'options'=>'{}',
                'status'=>$request->input('jawaban_benar')==3?true:false,
                'created_at'=>$now, 
                'updated_at'=>$now
            ]);
            JawabanSoalPMBModel::create([
                'id'=>Uuid::uuid4()->toString(),
                'soal_id'=>$soal_id,
                'jawaban'=>$request->input('jawaban4'),                
                'options'=>'{}',
                'status'=>$request->input('jawaban_benar')==4?true:false,
                'created_at'=>$now, 
                'updated_at'=>$now
            ]);

            return $soal;
        });
        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'store',
                                    'soal'=>$soal,                                                                                                  
                                    'message'=>'Data soal berhasil disimpan.'
                                ],200); 
    }
}