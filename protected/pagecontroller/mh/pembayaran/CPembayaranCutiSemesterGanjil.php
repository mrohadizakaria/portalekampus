<?php
prado::using ('Application.MainPageMHS');
class CPembayaranCutiSemesterGanjil Extends MainPageMHS {	
    public static $TotalSudahBayar=0;
    public static $KewajibanMahasiswa=0;
	public function onLoad($param) {
		parent::onLoad($param);		
        $this->createObj('Finance');
        $this->showPembayaranCutiSemesterGanjil=true;
		if (!$this->IsPostBack&&!$this->IsCallBack) {	
            if (!isset($_SESSION['currentPagePembayaranCutiSemesterGanjil'])||$_SESSION['currentPagePembayaranCutiSemesterGanjil']['page_name']!='mh.pembayaran.PembayaranCutiSemesterGanjil') {
				$_SESSION['currentPagePembayaranCutiSemesterGanjil']=array('page_name'=>'mh.pembayaran.PembayaranCutiSemesterGanjil','page_num'=>0,'search'=>false,'DataMHS'=>array(),'ta'=>$_SESSION['ta']);												
            }
            $this->setInfoToolbar();
            $this->tbCmbTA->DataSource=$this->DMaster->removeIdFromArray($this->DMaster->getListTA($this->Pengguna->getDataUser('tahun_masuk')),'none');
            $this->tbCmbTA->Text=$_SESSION['currentPagePembayaranCutiSemesterGanjil']['ta'];
            $this->tbCmbTA->dataBind();
            try {
                $datamhs = $this->Pengguna->getDataUser();
                $datamhs['idsmt']=1;
				$datamhs['ta']=$_SESSION['currentPagePembayaranCutiSemesterGanjil']['ta'];  
                $this->Finance->setDataMHS($datamhs);
                $datadulang=$this->Finance->getDataDulang(1,$datamhs['ta']);
                
                if (isset($datadulang['iddulang'])) {
                    if ($datadulang['k_status']!='C') {
                        $nim=$datamhs['nim'];
                        $status=$this->DMaster->getNamaStatusMHSByID ($datadulang['k_status']);
                        $ta=$datadulang['tahun'];
                        throw new Exception ("NIM ($nim) sudah daftar ulang di semester Ganjil T.A $ta dengan status $status.");		
                    }
                }
                $this->checkPembayaranSemesterLalu ();
                CPembayaranCutiSemesterGanjil::$KewajibanMahasiswa=$this->Finance->getBiayaCuti($datamhs['tahun_masuk'],$datamhs['semester_masuk'],$datamhs['idkelas']);
                $_SESSION['currentPagePembayaranCutiSemesterGanjil']['DataMHS']=$datamhs;                    
                $this->populateTransaksi();
                
                if ($this->ListTransactionRepeater->Items->Count() > 0) {
                    $this->txtAddNomorFaktur->Enabled=false;
                    $this->cmbAddTanggalFaktur->Enabled=false;
                    $this->btnSave->Enabled=false;
                   
                }else{
                    $this->txtAddNomorFaktur->Text='11'.$datamhs['ta'].mt_rand(900,9999);
                }
            }catch (Exception $ex) {
                $this->idProcess='view';	
                $this->errorMessage->Text=$ex->getMessage();
            }
            
		}	
    }
    public function setInfoToolbar() {        
        $ta=$this->DMaster->getNamaTA($_SESSION['currentPagePembayaranCutiSemesterGanjil']['ta']);        		
		$this->labelModuleHeader->Text="T.A $ta";        
    }
    public function changeTbTA ($sender,$param) {				
		$_SESSION['currentPagePembayaranCutiSemesterGanjil']['ta']=$this->tbCmbTA->Text;
		$this->redirect('pembayaran.PembayaranCutiSemesterGanjil',true); 
	}	
    public function getDataMHS($idx) {              
        if (isset($_SESSION['currentPagePembayaranCutiSemesterGanjil']['DataMHS']['nim'])) {
            return $_SESSION['currentPagePembayaranCutiSemesterGanjil']['DataMHS'][$idx];
        }        
    }
    public function populateTransaksi() {
        $datamhs=$_SESSION['currentPagePembayaranCutiSemesterGanjil']['DataMHS'];
        $nim=$datamhs['nim'];
        $tahun=$datamhs['ta'];
        $idsmt=1;
        
        $str = "SELECT no_transaksi,no_faktur,tanggal,date_added,dibayarkan,commited FROM transaksi_cuti WHERE tahun=$tahun AND idsmt=$idsmt AND nim='$nim'";
        $this->DB->setFieldTable(array('no_transaksi','no_faktur','tanggal','date_added','dibayarkan','commited'));
        $result=$this->DB->getRecord($str);	
        
        $this->ListTransactionRepeater->DataSource=$result;
        $this->ListTransactionRepeater->dataBind();     
    }
    public function dataBoundListTransactionRepeater ($sender,$param) {
		$item=$param->Item;
		if ($item->ItemType==='Item' || $item->ItemType==='AlternatingItem') {			
			if ($item->DataItem['commited']) {
                $item->btnDeleteFromRepeater->Enabled=false;
                $item->btnCommitFromRepeater->Enabled=false;
			}else{
                $item->btnDeleteFromRepeater->Attributes->onclick="if(!confirm('Apakah Anda ingin menghapus Transaksi ini?')) return false;";
            }
            CPembayaranCutiSemesterGanjil::$TotalSudahBayar+=$item->DataItem['dibayarkan'];
		}
	}
    public function checkNomorFaktur ($sender,$param) {
		$this->idProcess=$sender->getId()=='addNomorFaktur'?'add':'edit';
        $no_faktur=$param->Value;		
        if ($no_faktur != '') {
            try {
                if ($this->DB->checkRecordIsExist('no_faktur','transaksi',$no_faktur)) {                                
                    throw new Exception ("Nomor Faktur dari ($no_faktur) sudah tidak tersedia silahkan ganti dengan yang lain.");		
                }
            }catch (Exception $e) {
                $param->IsValid=false;
                $sender->ErrorMessage=$e->getMessage();
            }	
        }	
    }
    public function saveData ($sender,$param) {
		if ($this->Page->isValid) {	
            $userid=$this->Pengguna->getDataUser('userid');
            $datamhs=$_SESSION['currentPagePembayaranCutiSemesterGanjil']['DataMHS'];
            $tahun=$datamhs['ta'];
            $nim=$datamhs['nim'];
            
            $no_transaksi='11'.$tahun.mt_rand(900,9999);
            $no_faktur=addslashes($this->txtAddNomorFaktur->Text);            
            $tanggal=date('Y-m-d',$this->cmbAddTanggalFaktur->TimeStamp);
            
            $this->Finance->setDataMHS($datamhs);
            $dibayarkan=$this->Finance->getBiayaCuti($datamhs['tahun_masuk'],$datamhs['semester_masuk'],$datamhs['idkelas']);
            
            $str = "INSERT INTO transaksi_cuti SET no_transaksi='$no_transaksi',no_faktur='$no_faktur',tahun=$tahun,idsmt=1,nim='$nim',idkombi=0,dibayarkan=$dibayarkan,commited=0,tanggal='$tanggal',date_added=NOW(),date_modified=NOW(),userid=$userid";
            $this->DB->insertRecord($str);
            
            $this->redirect('pembayaran.PembayaranCutiSemesterGanjil',true);
        }
    }    
    public function deleteRecord ($sender,$param) {	
        $datamhs=$_SESSION['currentPagePembayaranCutiSemesterGanjil']['DataMHS']; 
        $nim=$datamhs['nim'];
		$no_transaksi=$this->getDataKeyField($sender,$this->ListTransactionRepeater);		
		$this->DB->deleteRecord("transaksi_cuti WHERE no_transaksi='$no_transaksi'");		
		$this->redirect('pembayaran.PembayaranCutiSemesterGanjil',true);
	}	
}