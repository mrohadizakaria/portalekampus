<?php
prado::using ('Application.MainPageMHS');
class CSkripsi extends MainPageMHS {
	public function onLoad($param) {		
		parent::onLoad($param);		            
        $this->showSkripsi=true;       
        $this->createObj('Nilai');
        if (!$this->IsPostBack&&!$this->IsCallBack) 
        {   
            if (!isset($_SESSION['currentPageSkripsi'])||$_SESSION['currentPageSkripsi']['page_name']!='mh.Skripsi') 
            {
                $_SESSION['currentPageSkripsi']=array('page_name'=>'mh.Skripsi',

                                                    );
            }  
            $nim=$this->Pengguna->getDataUser('nim');
            $str = "SELECT judul_skripsi,iddosen_pembimbing,iddosen_pembimbing2,ta,idsmt FROM skripsi WHERE nim='$nim'";
            $this->DB->setFieldTable(array('judul_skripsi','iddosen_pembimbing','iddosen_pembimbing2','ta','idsmt'));
            $r=$this->DB->getRecord($str);

            $daftar_dosen=$this->DMaster->getDaftarDosen();
            
            $this->cmbAddDosenPembimbing->DataSource=$daftar_dosen;
            $this->cmbAddDosenPembimbing->dataBind();     

            $this->cmbAddDosenPembimbing2->DataSource=$daftar_dosen;
            $this->cmbAddDosenPembimbing2->dataBind();

            $this->cmbAddTA->DataSource=$this->DMaster->removeIdFromArray($this->DMaster->getListTA($this->Pengguna->getDataUser('tahun_masuk')),'none');
			$this->cmbAddTA->dataBind();			
            
            $semester=$this->DMaster->removeIdFromArray($this->setup->getSemester(),'none');  				
			$this->cmbAddSemester->DataSource=$semester;
            $this->cmbAddSemester->dataBind();
            
            if (isset($r[1]))
            {
                $this->txtAddJuduluSkripsi->Text=$r[1]['judul_skripsi'];
                $this->cmbAddDosenPembimbing->Text=$r[1]['iddosen_pembimbing'];
                $this->cmbAddDosenPembimbing2->Text=$r[1]['iddosen_pembimbing2'];     
                $this->cmbAddTA->Text=$r[1]['ta'];
                $this->cmbAddSemester->Text=$r[1]['idsmt'];           
            } 
            else
            {
			    $this->cmbAddTA->Text=$_SESSION['ta'];
                $this->cmbAddSemester->Text=$_SESSION['semester'];
            }
		}        
        
    }   
    public function uploadSkripsi ($sender,$param)
    {
        if($sender->isValid)
        {
            $nim=$this->Pengguna->getDataUser('nim');
            $judul_skripsi=strtoupper(addslashes($this->txtAddJuduluSkripsi->Text));						
            $pembimbing=$this->cmbAddDosenPembimbing->Text;						
            $pembimbing2=$this->cmbAddDosenPembimbing2->Text;
            $ta=$this->cmbAddTA->Text;
            $idsmt=$this->cmbAddSemester->Text;
            if ($this->DB->checkRecordIsExist('nim','skripsi',$nim)){
                $str = "UPDATE skripsi SET judul_skripsi='$judul_skripsi',iddosen_pembimbing='$pembimbing',iddosen_pembimbing2='$pembimbing2',updated_at=NOW() WHERE nim='$nim'";
                $this->DB->updateRecord($str);
            }else{
                $str = "INSERT skripsi SET nim='$nim',judul_skripsi='$judul_skripsi',iddosen_pembimbing='$pembimbing',iddosen_pembimbing2='$pembimbing2',ta='$ta',idsmt='$idsmt',created_at=NOW(),updated_at=NOW()";
                $this->DB->insertRecord($str);
            }
            if ($sender->HasFile)
            {
                $mime=$sender->getFileType();
                $filename=substr(hash('sha512',rand()),0,8);
                $name=$sender->FileName;
                $part=$this->setup->cleanFileNameString($name);            
                $path="resources/files/skripsi/$filename-$part";
                $sender->saveAs($path);            
                chmod(BASEPATH."/$path",0644); 
            }
            else
            {

            }
            $this->redirect('skripsi',true);  
        }
    }
}