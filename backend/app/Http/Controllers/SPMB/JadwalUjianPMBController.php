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

        $jadwal_ujian=JadwalUjianPMBModel::select(\DB::raw('pe3_jadwal_ujian_pmb.id,
                                                pe3_jadwal_ujian_pmb.nama_kegiatan, 
                                                pe3_jadwal_ujian_pmb.jumlah_soal, 
                                                pe3_jadwal_ujian_pmb.tanggal_ujian, 
                                                pe3_jadwal_ujian_pmb.jam_mulai_ujian, 
                                                pe3_jadwal_ujian_pmb.jam_selesai_ujian, 
                                                pe3_jadwal_ujian_pmb.tanggal_akhir_daftar, 
                                                pe3_jadwal_ujian_pmb.durasi_ujian, 
                                                pe3_jadwal_ujian_pmb.status_pendaftaran, 
                                                pe3_jadwal_ujian_pmb.status_ujian, 
                                                pe3_jadwal_ujian_pmb.status_ujian, 
                                                pe3_jadwal_ujian_pmb.ruangkelas_id,
                                                pe3_ruangkelas.namaruang,
                                                pe3_jadwal_ujian_pmb.created_at,
                                                pe3_jadwal_ujian_pmb.updated_at
                                            '))
                                            ->leftJoin('pe3_ruangkelas','pe3_ruangkelas.id','pe3_jadwal_ujian_pmb.ruangkelas_id')
                                            ->where('ta',$tahun_pendaftaran)
                                            ->where('idsmt',$semester_pendaftaran)
                                            ->get();

        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',  
                                    'jadwal_ujian'=>$jadwal_ujian,                                                                                                                                   
                                    'message'=>'Fetch data jadwal ujian pmb berhasil.'
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
            'jumlah_soal'=>'required',
            'tanggal_ujian'=>'required',
            'jam_mulai_ujian'=>'required',
            'jam_selesai_ujian'=>'required',
            'tanggal_akhir_daftar'=>'required',            
            'ruangkelas_id'=>'required',
            'ta'=>'required',
            'idsmt'=>'required'
        ]);
        
        $jadwal_ujian=JadwalUjianPMBModel::create([
            'id'=>Uuid::uuid4()->toString(),
            'nama_kegiatan'=>$request->input('nama_kegiatan'),
            'jumlah_soal'=>$request->input('jumlah_soal'),
            'tanggal_ujian'=>$request->input('tanggal_ujian'),
            'jam_mulai_ujian'=>$request->input('jam_mulai_ujian'),
            'jam_selesai_ujian'=>$request->input('jam_selesai_ujian'),
            'tanggal_akhir_daftar'=>$request->input('tanggal_akhir_daftar'),            
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

        $jadwal_ujian=JadwalUjianPMBModel::find($id);
        if (is_null($jadwal_ujian))
        {
            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'update',                
                                    'message'=>["Fetch data jadwal ujian pmb dengan ID ($id) gagal diperoleh"]
                                ],422); 
        }
        else
        {
            $this->validate($request, [           
                'nama_kegiatan'=>'required',
                'jumlah_soal'=>'required',
                'tanggal_ujian'=>'required',
                'jam_mulai_ujian'=>'required',
                'jam_selesai_ujian'=>'required',
                'tanggal_akhir_daftar'=>'required',            
                'ruangkelas_id'=>'required',                
            ]);            
                
            $jadwal_ujian->nama_kegiatan=$request->input('nama_kegiatan');
            $jadwal_ujian->jumlah_soal=$request->input('jumlah_soal');
            $jadwal_ujian->tanggal_ujian=$request->input('tanggal_ujian');
            $jadwal_ujian->jam_mulai_ujian=$request->input('jam_mulai_ujian');
            $jadwal_ujian->jam_selesai_ujian=$request->input('jam_selesai_ujian');
            $jadwal_ujian->tanggal_akhir_daftar=$request->input('tanggal_akhir_daftar');
            $jadwal_ujian->ruangkelas_id=$request->input('ruangkelas_id');
            $jadwal_ujian->save();
                 
            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'update',  
                                        'soal'=>$jadwal_ujian,                                                                                                                                                                                                                                                                                                                                                    
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