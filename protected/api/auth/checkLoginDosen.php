<?php
prado::using('Application.api.BaseWS');
class CheckLoginDosen extends BaseWS {	
	public function getJsonContent() {
		try {
			$this->validate ();
			$data=$_POST;
			if (!isset($data['username'])) {
				$this->payload['status']='30';
				throw new Exception ("Proses Login telah berhasil, namun ada error yaitu data POST username tidak ada !!!");
			}
			if (empty($data['password'])) {
				$this->payload['status']='30';
				throw new Exception ("Proses Login telah berhasil, namun ada error yaitu data password kosong !!!");
			}
			$username=addslashes($data['username']);
			$password=addslashes($data['password']);;
            
            $payload="data dosen ($username) dan password ($password) udah sampai di server makasih";
            $message="username atau password salah";
            $this->payload['payload']=$payload;							
            $this->payload['message']=$message;
		}catch (Exception $e) {
			$this->payload['message'] = $e->getMessage();
		}
		$this->Pengguna->insertNewActivity ('json=check_login_Dosen',"melakukan request api terhadap method check_login_Dosen, outputnya: ".$this->payload['message']);
		return $this->payload;
	
	}
}