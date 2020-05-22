<?php

namespace App\Http\Controllers\SPMB;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\SPMB\PMBPersyaratanModel;
use App\Helpers\Helper;

use Ramsey\Uuid\Uuid;

class PMBPersyaratanController extends Controller { 
    /**
     * digunakan untuk mendapatkan daftar persyaratan mahasiswa baru
     */
    public function index(Request $request)
    {
       return Response()->json([]);

    }
    /**
     * digunakan untuk mendapatkan daftar persyaratan mahasiswa baru
     */
    public function show(Request $request,$id)
    {
        
        $user = User::find($id);
        if (is_null($user))
        {
            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'fetchdata',                
                                        'message'=>["User ID ($id) gagal diperoleh"]
                                    ],422); 
        }
        else
        {
            $subquery = \DB::table('pe3_pmb_persyaratan')
                            ->select(\DB::raw('id AS persyaratan_pmb_id,persyaratan_id,path,created_at,updated_at'))
                            ->where('user_id',$id);

            $persyaratan=\DB::table('pe3_persyaratan')
                            ->select(\DB::raw('pe3_persyaratan.id AS persyaratan_id,
                                        pe3_pmb_persyaratan.persyaratan_pmb_id,
                                        pe3_persyaratan.nama_persyaratan,
                                        pe3_pmb_persyaratan.path,
                                        pe3_pmb_persyaratan.created_at,
                                        pe3_pmb_persyaratan.updated_at'))
                            ->leftJoinSub($subquery,'pe3_pmb_persyaratan',function($join){
                                $join->on('pe3_persyaratan.id','=','pe3_pmb_persyaratan.persyaratan_id');
                            })
                            ->orderBy('pe3_persyaratan.nama_persyaratan','ASC')
                            ->get();

            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'fetchdata',
                                    'persyaratan'=>$persyaratan,      
                                    'message'=>'Persyaratan user PMB '.$user->name.' berhasil diperoleh.'
                                ],200); 
        }
    }
    public function upload (Request $request,$id)
    {
        $user = User::find($id); 
        
        if ($user == null)
        {
            return Response()->json([
                                    'status'=>0,
                                    'pid'=>'store',                
                                    'message'=>["Data Mahasiswa tidak ditemukan."]
                                ],422);         
        }
        else
        {
            $this->validate($request, [      
                'persyaratan_pmb_id'=>'required',
                'persyaratan_id'=>'required|exists:pe3_persyaratan,id',                                                               
                'nama_persyaratan'=>'required',  
                'foto'=>'required'                        
            ]);
            $name=$user->name;
            $foto = $request->file('foto');
            $mime_type=$foto->getMimeType();
            if ($mime_type=='image/png' || $mime_type=='image/jpeg')
            {
                $folder=Helper::public_path('images/pmb/');
                $file_name=uniqid('img').".".$foto->getClientOriginalExtension();
                
                $persyaratan=PMBPersyaratanModel::find($request->input('persyaratan_pmb_id'));

                if (is_null($persyaratan))
                {
                    $now = \Carbon\Carbon::now()->toDateTimeString();        
                    $persyaratan=PMBPersyaratanModel::create([
                                                                'id'=>Uuid::uuid4()->toString(),
                                                                'persyaratan_id'=>$request->input('persyaratan_id'),
                                                                'user_id'=>$id,
                                                                'nama_persyaratan'=> $request->input('nama_persyaratan'),
                                                                'path'=>"storage/images/pmb/$file_name",                                            
                                                                'created_at'=>$now, 
                                                                'updated_at'=>$now
                                                            ]); 
                    
                }
                else
                {
                    $old_file=$persyaratan->path;
                    $persyaratan->path="storage/images/pmb/$file_name";
                    $persyaratan->save();
                    if ($old_file != 'images/no_photo.png')
                    {
                        $old_file=str_replace('storage/','',$old_file);
                        if (is_file(Helper::public_path($old_file)))
                        {
                            unlink(Helper::public_path($old_file));
                        }
                    }
                }                
                $foto->move($folder,$file_name);
                return Response()->json([
                                            'status'=>0,
                                            'pid'=>'store',
                                            'persyaratan'=>$persyaratan,                
                                            'message'=>"Persyaratan Mahasiswa baru ($name)  berhasil diupload"
                                        ],200);    
            }
            else
            {
                return Response()->json([
                                        'status'=>1,
                                        'pid'=>'store',
                                        'message'=>["Extensi file yang diupload bukan jpg atau png."]
                                    ],422); 
                

            }
        }
    }
    public function hapusfilepersyaratan(Request $request,$id)
    {
        $persyaratan = PMBPersyaratanModel::find($id); 
        
        if ($persyaratan == null)
        {
            return Response()->json([
                                    'status'=>0,
                                    'pid'=>'destroy',                
                                    'message'=>["Data Persyaratan Mahasiswa Baru tidak ditemukan."]
                                ],422);         
        }
        else
        {
            $userid=$persyaratan->user_id;
            $old_file=$persyaratan->path;            
            $persyaratan->delete();

            if ($old_file != 'images/no-image.png')
            {
                $old_file=str_replace('storage/','',$old_file);
                if (is_file(Helper::public_path($old_file)))
                {
                    unlink(Helper::public_path($old_file));
                }
            }
            
            return Response()->json([
                                        'status'=>1,
                                        'pid'=>'destroy',                                        
                                        'message'=>"Persyaratan Mahasiswa Baru user id ($userid)  berhasil dihapus"
                                    ],200);
        }
    }
}
