<?php

namespace App\Http\Controllers\DMaster;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\DMaster\ProgramStudiModel;
use App\Models\System\ConfigurationModel;

class ProgramStudiController extends Controller {  
    /**
     * daftar program studi
     */
    public function index(Request $request)
    {
        $prodi=ProgramStudiModel::all();
        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',  
                                    'prodi'=>$prodi,                                                                                                                                   
                                    'message'=>'Fetchs data program studi berhasil.'
                                ],200);     
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->hasPermissionTo('DMASTER-PRODI_STORE');

        $bentuk_pt=ConfigurationModel::getCache('BENTUK_PT');
        if ($bentuk_pt=='sekolahtinggi')
        {
            $rule=[            
                'kode_prodi'=>'required|numeric|unique:pe3_prodi',
                'nama_prodi'=>'required|string|unique:pe3_prodi',            
            ];
            $kode_fakultas=null;
        }
        else
        {
            $rule=[            
                'kode_prodi'=>'required|numeric|unique:pe3_prodi',
                'kode_fakultas'=>'required|exists:pe3_fakultas,kode_fakultas',
                'nama_prodi'=>'required|string|unique:pe3_prodi',            
            ];
            $kode_fakultas=$request->input('kode_fakultas');
        }
        $this->validate($request, $rule);
             
        $prodi=ProgramStudiModel::create([
            'kode_prodi'=>$request->input('kode_prodi'),
            'kode_fakultas'=>$kode_fakultas,
            'nama_prodi'=>$request->input('nama_prodi'),            
        ]);                      
        
        \App\Models\System\ActivityLog::log($request,[
                                        'object' => $prodi,
                                        'object_id'=>$prodi->kode_prodi, 
                                        'user_id' => $this->guard()->user()->id, 
                                        'message' => 'Menambah program studi baru berhasil'
                                    ]);

        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'store',
                                    'prodi'=>$prodi,                                    
                                    'message'=>'Data program studi berhasil disimpan.'
                                ],200); 

    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->hasPermissionTo('DMASTER-PRODI_UPDATE');

        $prodi = ProgramStudiModel::find($id);
        if (is_null($prodi))
        {
            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'update',                
                                    'message'=>"Kode Program Studi ($id) gagal diupdate"
                                ],200); 
        }
        else
        {
            $this->validate($request, [
                                        'kode_prodi'=>[
                                                        'required',                                                        
                                                        Rule::unique('pe3_prodi')->ignore($prodi->kode_prodi,'kode_prodi')
                                                    ],           
                                        
                                        'nama_prodi'=>[
                                                        'required',
                                                        Rule::unique('pe3_prodi')->ignore($prodi->nama_prodi,'nama_prodi')
                                                    ],           
                                        
                                    ]); 
                                    
            $prodi->kode_prodi = $request->input('kode_prodi');
            $prodi->nama_prodi = $request->input('nama_prodi');            
            $prodi->save();

            \App\Models\System\ActivityLog::log($request,[
                                                        'object' => $prodi,
                                                        'object_id'=>$prodi->kode_prodi, 
                                                        'user_id' => $this->guard()->user()->id, 
                                                        'message' => 'Mengubah data program studi ('.$prodi->nama_prodi.') berhasil'
                                                    ]);

            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'update',
                                    'prodi'=>$prodi,      
                                    'message'=>'Data program studi '.$prodi->username.' berhasil diubah.'
                                ],200); 
        }
    }
    /**
     * daftar program studi
     */
    public function programstudi(Request $request,$id)
    {
        $prodi=ProgramStudiModel::find($id);
        if (is_null($prodi))
        {
            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',                
                                    'message'=>"Fetch data program studi berdasarkan id program studi gagal"
                                ],200); 
        }
        else
        {
            $programstudi = $prodi->programstudi;
            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'fetchdata',  
                                        'programstudi'=>$programstudi,                                                                                                                                   
                                        'message'=>'Fetchs data program studi berdasarkan id program studi berhasil.'
                                    ],200);     

        }
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,$id)
    { 
        $this->hasPermissionTo('DMASTER-PRODI_DESTROY');

        $prodi = ProgramStudiModel::find($id); 
        
        if (is_null($prodi))
        {
            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'destroy',                
                                    'message'=>"Kode program studi ($id) gagal dihapus"
                                ],200); 
        }
        else
        {
            \App\Models\System\ActivityLog::log($request,[
                                                                'object' => $prodi, 
                                                                'object_id' => $prodi->kode_prodi, 
                                                                'user_id' => $this->guard()->user()->id, 
                                                                'message' => 'Menghapus Kode Program Studi ('.$id.') berhasil'
                                                            ]);
            $prodi->delete();
            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'destroy',                
                                        'message'=>"Program Studi dengan kode ($id) berhasil dihapus"
                                    ],200);         
        }
                  
    }
}