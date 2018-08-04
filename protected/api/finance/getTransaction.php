<?php
prado::using('Application.api.BaseWS');
class getTransaction extends BaseWS {	
	public function getJsonContent() {
		try {
			$this->validate ();
			$data=$_POST;
			if (!isset($data['no_transaksi'])) {
				throw new Exception ("Proses Login telah berhasil, namun ada error yaitu data POST no_transaksi tidak ada !!!");
			}
			if (empty($data['no_transaksi'])) {
				throw new Exception ("Proses Login telah berhasil, namun ada error yaitu data no_transaksi kosong !!!");
			}
			$no_transaksi=addslashes($data['no_transaksi']);
			$tipe_transaksi=substr($no_transaksi, 0,2);
			switch ($tipe_transaksi) {
				case 10: //bayar biasa
					$str = "SELECT t.no_transaksi,t.no_faktur,t.kjur,t.tahun,t.idsmt,t.idkelas,k.nkelas,t.no_formulir,fp.nama_mhs,t.nim,t.commited,t.tanggal,t.date_added FROM transaksi t LEFT JOIN formulir_pendaftaran fp ON (fp.no_formulir=t.no_formulir) LEFT JOIN kelas k ON (k.idkelas=t.idkelas) WHERE t.no_transaksi='$no_transaksi'";
					$this->DB->setFieldTable(array('no_transaksi','no_faktur','kjur','tahun','idsmt','idkelas','nkelas','no_formulir','nama_mhs','nim','commited','tanggal','date_added'));		
					$r=$this->DB->getRecord($str);						
					if (isset($r[1])) {
						$result=$r[1];
						$payload['no_formulir']=$result['no_formulir'];
						$payload['nim']=$result['nim'];
						if ($result['nama_mhs'] == '' || $result['nim'] == '' || $result['kjur'] == 0) {
							$no_formulir=$payload['no_formulir'];
							$str = "SELECT nama_mhs FROM formulir_pendaftaran_temp WHERE no_formulir='$no_formulir'";
							$this->DB->setFieldTable(array('nama_mhs'));		
							$r=$this->DB->getRecord($str);	
							$result['nama_mhs']=isset($r[1])?$r[1]['nama_mhs']:'';		
							$keterangan='MAHASISWA BARU';
						}else{
							$keterangan='MAHASISWA LAMA';
						}
						$payload['nama_mhs']=$result['nama_mhs'];
						$payload['no_transaksi']=$result['no_transaksi'];
						$payload['no_faktur']=$result['no_faktur'];
						$payload['kjur']=$result['kjur'];
						$payload['tahun']=$result['tahun'];
						$payload['idsmt']=$result['idsmt'];						
						$payload['idkelas']=$result['idkelas'];		
						$this->createObj('dmaster');
						$payload['nama_prodi']=$payload['kjur'] > 0 ? $this->DMaster->getNamaProgramStudiByID($payload['kjur']) : '';
						$payload['semester']=$this->semester[$result['idsmt']];	
						$payload['nama_kelas']=$result['nkelas'];
						$this->createObj('Finance');						
						$payload['totaltagihan']=$this->Finance->getTotalTagihanByNoTransaksi($no_transaksi);
						$payload['commited']=$result['commited'];
						$payload['keterangan']=$keterangan;
						$this->payload['payload']=$payload;							
						$this->payload['message']="Proses Login telah berhasil, data transaksi dengan nomor ($no_transaksi) berhasil diperoleh !!!";
					}else{
						throw new Exception ("Proses Login telah berhasil, namun data transaksi dengan nomor ($no_transaksi) tidak ada di database !!!");
					}			
				break;
				case 11: //bayar cuti
					$str = "SELECT no_transaksi,no_faktur,tahun,idsmt,nim,dibayarkan AS totaltagihan,commited,tanggal,date_added FROM transaksi_cuti WHERE no_transaksi='$no_transaksi'";
					$this->DB->setFieldTable(array('no_transaksi','no_faktur','tahun','idsmt','nim','totaltagihan','commited','tanggal','date_added'));		
					$r=$this->DB->getRecord($str);						
					if (isset($r[1])) {
						$this->payload['payload']=$r[1];							
						$this->payload['message']="Proses Login telah berhasil, data transaksi cuti dengan nomor ($no_transaksi) berhasil diperoleh !!!";
					}else{
						throw new Exception ("Proses Login telah berhasil, namun data transaksi cuti dengan nomor ($no_transaksi) tidak ada di database !!!");
					}		
				break;
				default :
					throw new Exception ("Proses Login telah berhasil, namun ada error yaitu tipe_transaksi tidak dikenal.");
			}
		}catch (Exception $e) {
			$this->payload['message'] = $e->getMessage();
		}
		$this->Pengguna->insertNewActivity ('json=get_transaction',"melakukan request api terhadap method get_transaction, outputnya: ".$this->payload['message']);
		return $this->payload;
	
	}
}