<?php
prado::using('Application.api.BaseWS');
class getTransaction extends BaseWS {	
	public function getJsonContent() {		
		try {
			$this->validate ();
			$data=$_POST;
			if (!isset($data['no_transaksi']) && !isset($data['tipe_transaksi'])) {
				throw new Exception ("Proses Login telah berhasil, namun ada error yaitu data POST no_transaksi atau POST tipe_transaksi tidak ada !!!");
			}

			$no_transaksi=addslashes($data['no_transaksi']);
			$str = "SELECT t.no_transaksi,t.kjur,t.no_formulir,fp.nama_mhs,t.nim,t.tahun,t.idsmt,t.commited FROM transaksi t LEFT JOIN formulir_pendaftaran fp ON (fp.no_formulir=t.no_formulir) WHERE t.no_transaksi='$no_transaksi'";
			$this->DB->setFieldTable(array('no_transaksi','kjur','no_formulir','nama_mhs','nim','tahun','idsmt','commited'));		
			$r=$this->DB->getRecord($str);
			if (!isset($r[1])) {
				throw new Exception ("Proses Login telah berhasil, namun transaksi dengan nomor ($no_transaksi) tidak ada di database !!!");				
			}
			
			$result=$r[1];
			if ($result['commited']) {
				$this->payload['message']="Proses Login telah berhasil, namun data transaksi dengan nomor ($no_transaksi) telah Commit !!!. Bisa di rollback, beritahu ke bagian keuangan dengan menyebutkan nomor Transaksi ini ($no_transaksi)";
			}

			$this->DB->query('BEGIN');
			$this->DB->updateRecord("UPDATE transaksi SET commited=1,date_modified=NOW() WHERE no_transaksi='$no_transaksi'");
			if ($result['nama_mhs'] == '' && $result['nim'] == '' && || $result['kjur'] == 0) {
				$this->DB->query('COMMIT'); //biaya pendaftaran
			}elseif ($result['nim'] == '') { 
				$this->DB->query('COMMIT'); //pembayaran mahasiswa baru
			}else{

			}
			$this->payload['message']="Proses Login telah berhasil, data transaksi dengan nomor ($no_transaksi) berhasil di Commit !!!. Bisa di rollback, beritahu ke bagian keuangan dengan menyebutkan nomor Transaksi ini ($no_transaksi)";
		
		}catch (Exception $e) {
			$this->payload['message'] = $e->getMessage();
		}	
		$this->Pengguna->insertNewActivity ('json=commit_transaction',"melakukan request api terhadap method commit_transaction, outputnya: ".$this->payload['message']);
		return $this->payload;
	}
}