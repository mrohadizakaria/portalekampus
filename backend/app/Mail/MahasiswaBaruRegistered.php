<?php

namespace App\Mail;

use App\Models\User;
use App\Models\System\SettingModel;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MahasiswaBaruRegistered extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user=$user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $setting = SettingModel::find(4);            
        return $this->view('emails.MahasiswaBaruRegistered')->with([
                                                                    'nama_pt'=>$setting->value,
                                                                    'name'=>$this->user->name
                                                                ]);        
    }
}
