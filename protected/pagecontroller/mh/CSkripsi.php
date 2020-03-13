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
            $str = "SELECT judul_skripsi,iddosen_pembimbing,iddosen_pembimbing2,ta,idsmt,file_skripsi FROM skripsi WHERE nim='$nim'";
            $this->DB->setFieldTable(array('judul_skripsi','iddosen_pembimbing','iddosen_pembimbing2','ta','idsmt','file_skripsi'));
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
                
                $this->linkFileSkripsi->NavigateUrl=$this->setup->getAddress().'/'.$r[1]['file_skripsi'];
                $this->linkFileSkripsi->Text='Download';
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
            try {	
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
                    $str = "INSERT skripsi SET nim='$nim',judul_skripsi='$judul_skripsi',iddosen_pembimbing='$pembimbing',iddosen_pembimbing2='$pembimbing2',ta='$ta',idsmt='$idsmt',file_skripsi='',created_at=NOW(),updated_at=NOW()";
                    $this->DB->insertRecord($str);
                }
                if ($sender->HasFile)
                {
                    $mime=$sender->getFileType();
                    if ($mime=='application/pdf')
                    {
                        $filename=substr(hash('sha512',rand()),0,8);
                        $name=$sender->FileName;
                        $part=$this->setup->cleanFileNameString($name);            
                        $path="resources/files/skripsi/$filename-$part";
                        $sender->saveAs($path);            
                        chmod(BASEPATH."/$path",0644); 

                        $str = "UPDATE skripsi SET file_skripsi='$path' WHERE nim='$nim'";
                        $this->DB->updateRecord($str);
                    }
                    else
                    {
                        throw new Exception("Jenis File ini ($mime) tidak didukung. File yang didukung hanya berformat PDF.");
                    }                
                }
                else
                {
                    switch ($sender->ErrorCode){
                        case 1:
                            $err="file size too big (check inside php.ini).";
                        break;
                        case 2:
                            $err="file size too big (form).";
                        break;
                        case 3:
                            $err="file upload interrupted.";
                        break;
                        case 4:
                            $err="no file chosen.";
                        break;
                        case 6:
                            $err="internal problem (missing temporary directory).";
                        break;
                        case 7:
                            $err="unable to write file on disk.";
                        break;
                        case 8:
                            $err="file type not accepted.";
                        break;
                    }
                    throw new Exception($err);
                }
                $this->redirect('Skripsi',true);                 
            }catch (Exception $e) {
                echo ($e->getMessage());
                exit();
            }	           
            
        }
    }
}