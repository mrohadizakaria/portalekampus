<?php

namespace App\Http\Controllers\DMaster;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Models\DMaster\PersyaratanModel;

class PersyaratanController extends Controller {  
    /**
     * daftar persyaratan
     */
    public function index(Request $request)
    {
        $persyaratan=PersyaratanModel::all();
        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',  
                                    'persyaratan'=>$persyaratan,                                                                                                                                   
                                    'message'=>'Fetchs data persyaratan berhasil.'
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
        $this->hasPermissionTo('DMASTER-FAKULTAS_STORE');

        $this->validate($request, [            
            'kode_persyaratan'=>'required|numeric|unique:pe3_persyaratan',
            'nama_persyaratan'=>'required|string|unique:pe3_persyaratan',            
        ]);
             
        $persyaratan=PersyaratanModel::create([
            'kode_persyaratan'=>$request->input('kode_persyaratan'),
            'nama_persyaratan'=>$request->input('nama_persyaratan'),            
        ]);                      
        
        \App\Models\System\ActivityLog::log($request,[
                                        'object' => $persyaratan,
                                        'object_id'=>$persyaratan->kode_persyaratan, 
                                        'user_id' => $this->guard()->user()->id, 
                                        'message' => 'Menambah persyaratan baru berhasil'
                                    ]);

        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'store',
                                    'persyaratan'=>$persyaratan,                                    
                                    'message'=>'Data persyaratan berhasil disimpan.'
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
        $this->hasPermissionTo('DMASTER-FAKULTAS_UPDATE');

        $persyaratan = PersyaratanModel::find($id);
        if (is_null($persyaratan))
        {
            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'update',                
                                    'message'=>["Kode Persyaratan ($id) gagal diupdate"]
                                ],422); 
        }
        else
        {
            $this->validate($request, [
                                        'kode_persyaratan'=>[
                                                        'required',                                                        
                                                        Rule::unique('pe3_persyaratan')->ignore($persyaratan->kode_persyaratan,'kode_persyaratan')
                                                    ],           
                                        
                                        'nama_persyaratan'=>[
                                                        'required',
                                                        Rule::unique('pe3_persyaratan')->ignore($persyaratan->nama_persyaratan,'nama_persyaratan')
                                                    ],           
                                        
                                    ]); 
                                    
            $persyaratan->kode_persyaratan = $request->input('kode_persyaratan');
            $persyaratan->nama_persyaratan = $request->input('nama_persyaratan');            
            $persyaratan->save();

            \App\Models\System\ActivityLog::log($request,[
                                                        'object' => $persyaratan,
                                                        'object_id'=>$persyaratan->kode_persyaratan, 
                                                        'user_id' => $this->guard()->user()->id, 
                                                        'message' => 'Mengubah data persyaratan ('.$persyaratan->nama_persyaratan.') berhasil'
                                                    ]);

            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'update',
                                    'persyaratan'=>$persyaratan,      
                                    'message'=>'Data persyaratan '.$persyaratan->username.' berhasil diubah.'
                                ],200); 
        }
    }
    /**
     * daftar persyaratan dari sebuah proses 
     */
    public function proses(Request $request,$id)
    {
        $prodi_id=intval($request->input('prodi_id'));

        if ($prodi_id >0 )
        {
            $this->validate($request, [            
                'prodi_id'=>'required|numeric|exists:pe3_prodi,id',            
            ]);
            $persyaratan=PersyaratanModel::where('prodi_id',$request->input('prodi_id'))
                                        ->where('proses',$id)
                                        ->get();
        }
        else
        {
            $persyaratan=PersyaratanModel::where('proses',$id)
                                        ->get();
        }

        
        
        return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',  
                                    'persyaratan'=>$persyaratan,                                                                                                                                   
                                    'message'=>"Fetch data persyaratan $id berhasil diperoleh."
                                ],200);     


    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,$id)
    { 
        $this->hasPermissionTo('DMASTER-FAKULTAS_DESTROY');

        $persyaratan = PersyaratanModel::find($id); 
        
        if (is_null($persyaratan))
        {
            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'destroy',                
                                    'message'=>["Kode persyaratan ($id) gagal dihapus"]
                                ],422); 
        }
        else
        {
            \App\Models\System\ActivityLog::log($request,[
                                                                'object' => $persyaratan, 
                                                                'object_id' => $persyaratan->kode_persyaratan, 
                                                                'user_id' => $this->guard()->user()->id, 
                                                                'message' => 'Menghapus Kode Persyaratan ('.$id.') berhasil'
                                                            ]);
            $persyaratan->delete();
            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'destroy',                
                                        'message'=>"Persyaratan dengan kode ($id) berhasil dihapus"
                                    ],200);         
        }
                  
    }
}