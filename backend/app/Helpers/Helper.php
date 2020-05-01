<?php

namespace App\Helpers;
use Carbon\Carbon;
use URL;
class Helper {        
    /**
     * digunakan untuk memformat tanggal
     * @param type $format
     * @param type $date
     * @return type date
     */
    public static function tanggal($format, $date=null) {
        Carbon::setLocale(app()->getLocale());
        if ($date == null){
            $tanggal=Carbon::parse(Carbon::now())->format($format);
        }else{
            $tanggal = Carbon::parse($date)->format($format);
        }        
        return $tanggal;
    }   
    /**
	* digunakan untuk mem-format uang
	*/
	public static function formatUang ($uang=0,$decimal=2) {
		$formatted = number_format((float)$uang,$decimal,',','.');
        return $formatted;
    }
    /**
	* digunakan untuk mem-format angka
	*/
	public static function formatAngka ($angka=0) {
        $bil = intval($angka);
        $formatted = ($bil < $angka) ? $angka : $bil;
        return $formatted;
    }
    /**
	* digunakan untuk mem-format persentase
	*/
	public static function formatPersen ($pembilang,$penyebut=0,$dec_sep=3) {
        $result=0.00;
		if ($pembilang > 0 && $penyebut > 0) {            
            $temp=round(number_format((float)($pembilang/$penyebut)*100,4),$dec_sep);
            $result = $temp;
        }
        else
        {
            $result=0;
        }
        return $result;
	}
    /**
	* digunakan untuk mem-format pecahan
	*/
	public static function formatPecahan ($pembilang,$penyebut=0,$dec_sep=3) {
        $result=0;
		if ($pembilang > 0 && $penyebut > 0) {
            $result=round(number_format((float)($pembilang/$penyebut),4),$dec_sep);
        }
        return $result;
    }    
    
    public static function public_path($path = null)
    {
        return rtrim(app()->basePath('storage/app/public/' . $path), '/');
    } 
    public static function exported_path()
    {
        return app()->basePath('storage/app/exported/');
    } 
}