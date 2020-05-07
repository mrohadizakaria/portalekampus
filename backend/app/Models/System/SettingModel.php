<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class SettingModel extends Model {    
     /**
     * nama tabel model ini.
     *
     * @var string
     */
    protected $table = 'setting';
    /**
     * primary key tabel ini.
     *
     * @var string
     */
    protected $primaryKey = 'setting_id';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'group', 'key', 'value'
    ];
    /**
     * enable auto_increment.
     *
     * @var string
     */
    public $incrementing = false;
    /**
     * activated timestamps.
     *
     * @var string
     */
    public $timestamps = false;

    //digunakan untuk menyimpan ke cache
    public static function toCache()
    {
        $setting = SettingModel::all()->pluck('value','key'); 
        Cache::put('setting', $setting);
    }
    public static function getCache($idx=null)
    {
        if ($idx == null)
        {
            return Cache::get('setting');
        }
        else
        {
            $setting=Cache::get('setting');
            return $setting[$idx];
        }
    }
}