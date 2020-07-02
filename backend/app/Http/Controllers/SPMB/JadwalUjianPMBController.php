<?php

namespace App\Http\Controllers\SPMB;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\SPMB\JadwalUjianPMBModel;

use Ramsey\Uuid\Uuid;

class JadwalUjianPMBController extends Controller {  
    /**
     * daftar soal
     */
    public function index(Request $request)
    {
        $this->hasPermissionTo('SPMB-PMB-JADWAL-UJIAN_BROWSE');

        $this->validate($request, [                       
            'tahun_pendaftaran'=>'required',
            'semester_pendaftaran'=>'required'
        ]);
        $tahun_pendaftaran=$request->input('tahun_pendaftaran');
        $semester_pendaftaran=$request->input('semester_pendaftaran');

        $soal=JadwalUjianPMBModel::where('ta',$tahun_pendaftaran)
                                    ->where('idsmt',$semester_pendaftaran)
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
        $this->hasPermissionTo('SPMB-PMB-JADWAL-UJIAN_STORE');

        $this->validate($request, [           
            'nama_kegiatan'=>'required',
            'tanggal_ujian'=>'required',
            'jam_mulai_ujian'=>'required',
            'jam_selesai_ujian'=>'required',
            'tanggal_akhir_daftar'=>'required',
            'durasi_ujian'=>'required',
            'ruangkelas_id'=>'required',
            'ta'=>'required',
            'idsmt'=>'required'
        ]);
        
        $jadwal_ujian=JadwalUjianPMBModel::create([
            'id'=>Uuid::uuid4()->toString(),
            'nama_kegiatan'=>$request->input('nama_kegiatan'),
            'tanggal_ujian'=>$request->input('tanggal_ujian'),
            'jam_mulai_ujian'=>$request->input('jam_mulai_ujian'),
            'jam_selesai_ujian'=>$request->input('jam_selesai_ujian'),
            'tanggal_akhir_daftar'=>$request->input('tanggal_akhir_daftar'),
            'durasi_ujian'=>$request->input('durasi_ujian'),
            'ruangkelas_id'=>$request->input('ruangkelas_id'),
            'ta'=> $request->input('ta'),
            'idsmt'=>$request->input('idsmt'),                        
        ]);            
        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'store',
                                    'jadwal_ujian'=>$jadwal_ujian,                                                                                                                                 
                                    'message'=>'Data jadwal ujian berhasil disimpan.'
                                ],200); 
    }
    /**
     * daftar soal
     */
    public function show(Request $request,$id)
    {
        $this->hasPermissionTo('SPMB-PMB-JADWAL-UJIAN_SHOW');

        $soal=JadwalUjianPMBModel::find($id);
        if (is_null($soal))
        {
            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'show',                
                                    'message'=>["Fetch data soal pmb dengan ID ($id) gagal diperoleh"]
                                ],422); 
        }
        else
        {
            $jawaban = $soal->jawaban;
            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'fetchdata',  
                                        'soal'=>$soal,   
                                        'jawaban'=>$jawaban,                                                                                                                                                                                                                                                                                                           
                                        'message'=>"Fetch data soal pmb dengan id ($id) berhasil diperoleh."
                                    ],200);     
        }
    } 
    /**
     * update soal baru
     */
    public function update(Request $request,$id)
    {
        $this->hasPermissionTo('SPMB-PMB-JADWAL-UJIAN_UPDATE');

        $soal=JadwalUjianPMBModel::find($id);
        if (is_null($soal))
        {
            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'update',                
                                    'message'=>["Fetch data soal pmb dengan ID ($id) gagal diperoleh"]
                                ],422); 
        }
        else
        {
            $this->validate($request, [           
                'soal'=>'required',
                // 'gambar'=>'required',
                // 'jawaban1'=>'required',
                // 'jawaban2'=>'required',
                // 'jawaban3'=>'required',
                // 'jawaban4'=>'required',
                'jawaban_benar'=>'required',            
            ]);
            $soal->soal=$request->input('soal');
            $soal->save();
            
            $jawaban = JadwalUjianPMBModel::find($request->input('jawaban_benar'));
            if (!is_null($jawaban))
            {
                $jawaban->status=1;
                $jawaban->save();
            }
            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'update',  
                                        'soal'=>$soal,                                                                                                                                                                                                                                                                                                                                                    
                                        'message'=>"Mengubah data soal pmb dengan id ($id) berhasil."                                        
                                    ],200);    
        }
    } 
     /**
     * Menghapus soal ujian pmb
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,$id)
    { 
        $this->hasPermissionTo('SPMB-PMB-JADWAL-UJIAN_DESTROY');

        $soal=JadwalUjianPMBModel::find($id);
        
        if (is_null($soal))
        {
            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'destroy',                
                                    'message'=>["Soal PMB dengan ID ($id) gagal dihapus"]
                                ],422); 
        }
        else
        {
            $nama_soal=$soal->soal;
            $soal->delete();

            \App\Models\System\ActivityLog::log($request,[
                                                            'object' => $this->guard()->user(), 
                                                            'object_id' => $this->guard()->user()->id, 
                                                            'soal_id' => $soal->id, 
                                                            'message' => 'Menghapus Soal PMB ('.$nama_soal.') berhasil'
                                                        ]);
        
            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'destroy',                
                                        'message'=>"Soal Ujian PMB ($nama_soal) berhasil dihapus"
                                    ],200);         
        }
                  
    } 
}