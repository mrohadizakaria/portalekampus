<?php

namespace App\Http\Controllers\SPMB;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;

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
                                        'message'=>"User ID ($id) gagal diperoleh"
                                    ],200); 
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
                            ->get();
            return Response()->json([
                                    'status'=>1,
                                    'pid'=>'update',
                                    'persyaratan'=>$persyaratan,      
                                    'message'=>'Persyaratan user PMB '.$user->name.' berhasil diperoleh.'
                                ],200); 
        }
    }
}
