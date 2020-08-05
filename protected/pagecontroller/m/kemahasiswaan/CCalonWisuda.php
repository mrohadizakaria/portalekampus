<?php
prado::using ('Application.MainPageM');
class CCalonWisuda Extends MainPageM {		
	public function onLoad($param) {
		parent::onLoad($param);				
        $this->showSubMenuAkademikDulang=true;
        $this->showCalonWisuda=true;                
        $this->createObj('Akademik');
		if (!$this->IsPostBack&&!$this->IsCallBack) {
            if (!isset($_SESSION['currentPageCalonWisuda'])||$_SESSION['currentPageCalonWisuda']['page_name']!='m.kemahasiswaan.CalonWisuda') {
				$_SESSION['currentPageCalonWisuda']=array('page_name'=>'m.kemahasiswaan.CalonWisuda','page_num'=>0,'search'=>false,'tahun_masuk'=>$_SESSION['tahun_masuk']);												
			}
            $_SESSION['currentPageCalonWisuda']['search']=false;
            $this->tbCmbPs->DataSource=$this->DMaster->removeIdFromArray($_SESSION['daftar_jurusan'],'none');
            $this->tbCmbPs->Text=$_SESSION['kjur'];			
            $this->tbCmbPs->dataBind();	
          	            
            $this->tbCmbTahunMasuk->DataSource=$this->DMaster->removeIdFromArray($this->DMaster->getListTA(),'none');					
            $this->tbCmbTahunMasuk->Text=$_SESSION['currentPageCalonWisuda']['tahun_masuk'];						
            $this->tbCmbTahunMasuk->dataBind();

            $this->tbCmbOutputReport->DataSource=$this->setup->getOutputFileType();
            $this->tbCmbOutputReport->Text= $_SESSION['outputreport'];
            $this->tbCmbOutputReport->DataBind();

            $this->tbCmbOutputCompress->DataSource=$this->setup->getOutputCompressType();
            $this->tbCmbOutputCompress->Text= $_SESSION['outputcompress'];
            $this->tbCmbOutputCompress->DataBind();

            $this->populateData();
            $this->setInfoToolbar();
		}	
    }
    public function setInfoToolbar() {        
        $kjur=$_SESSION['kjur'];        
		$ps=$_SESSION['daftar_jurusan'][$kjur];                
		$tahunmasuk=$this->DMaster->getNamaTA($_SESSION['currentPageCalonWisuda']['tahun_masuk']);		        
		$this->lblModulHeader->Text="Program Studi $ps Tahun Masuk $tahunmasuk";        
	}
    public function Page_Changed ($sender,$param) {
		$_SESSION['currentPageCalonWisuda']['page_num']=$param->NewPageIndex;
		$this->populateData($_SESSION['currentPageCalonWisuda']['search']);
	}
	public function renderCallback ($sender,$param) {
		$this->RepeaterS->render($param->NewWriter);	
	}	
    public function searchRecord ($sender,$param){
        $_SESSION['currentPageCalonWisuda']['search']=true;
        $this->populateData($_SESSION['currentPageCalonWisuda']['search']);
    }
	public function changeTbTahunMasuk($sender,$param) {				
		$_SESSION['currentPageCalonWisuda']['tahun_masuk']=$this->tbCmbTahunMasuk->Text;
        $this->setInfoToolbar();
		$this->populateData();
	}
	public function changeTbPs ($sender,$param) {		
		$_SESSION['kjur']=$this->tbCmbPs->Text;
        $this->setInfoToolbar();
		$this->populateData();
	}	
	public function changeTbSemester ($sender,$param) {		
		$_SESSION['semester']=$this->tbCmbSemester->Text;        
        $this->setInfoToolbar();
		$this->populateData();
	}
    public function populateData($search=false) {         
		$kjur=$_SESSION['kjur'];
		$tahun_masuk=$_SESSION['currentPageCalonWisuda']['tahun_masuk'];      
        if ($search) {
            $str = "SELECT 
                        A.nim,
                        A.no_formulir,                        
                        A.nirm,
                        A.nama_mhs,
                        A.iddosen_wali,
                        A.idkelas,
                        A.k_status,
                        B.jumlah_sks
                    FROM v_datamhs A 
                    JOIN v_calon_wisudawan B ON (A.nim=B.nim)
                    WHERE 
                        A.tahun_masuk=$tahun_masuk AND
                        A.k_status != 'L' AND
                        A.kjur='$kjur'
                    "; 
            $txtsearch=addslashes($this->txtKriteria->Text);
            switch ($this->cmbKriteria->Text) {
                case 'no_formulir' :
                    $clausa="AND A.no_formulir='$txtsearch'";
                    $jumlah_baris=$this->DB->getCountRowsOfTable ("v_datamhs A 
                                                            JOIN v_calon_wisudawan B ON (A.nim=B.nim)
                                                            WHERE 
                                                                A.tahun_masuk=$tahun_masuk AND
                                                                A.k_status != 'L' AND
                                                                A.kjur='$kjur' $clausa",'A.nim');
                    $str = "$str $clausa";
                break;
                case 'nim' :
                    $clausa="AND A.nim='$txtsearch'";
                    $jumlah_baris=$this->DB->getCountRowsOfTable ("v_datamhs A 
                                                            JOIN v_calon_wisudawan B ON (A.nim=B.nim)
                                                            WHERE 
                                                                A.tahun_masuk=$tahun_masuk AND
                                                                A.k_status != 'L' AND
                                                                A.kjur='$kjur' $clausa",'A.nim');
                    $str = "$str $clausa";
                break;
                case 'nirm' :
                    $clausa="AND A.nirm='$txtsearch'";
                    $jumlah_baris=$this->DB->getCountRowsOfTable ("v_datamhs A 
                                                            JOIN v_calon_wisudawan B ON (A.nim=B.nim)
                                                            WHERE 
                                                                A.tahun_masuk=$tahun_masuk AND
                                                                A.k_status != 'L' AND
                                                                A.kjur='$kjur' $clausa",'A.nim');
                    $str = "$str $clausa";
                break;
                case 'nama' :
                    $clausa="AND A.nama_mhs LIKE '%$txtsearch%'";
                    $jumlah_baris=$this->DB->getCountRowsOfTable ("v_datamhs A 
                                                            JOIN v_calon_wisudawan B ON (A.nim=B.nim)
                                                            WHERE 
                                                                A.tahun_masuk=$tahun_masuk AND
                                                                A.k_status != 'L' AND
                                                                A.kjur='$kjur' $clausa",'A.nim');
                    $str = "$str $clausa";
                break;
            }
        }else{      
            $str = "SELECT 
                        A.nim,                                   
                        A.nirm,
                        A.nama_mhs,
                        A.iddosen_wali,
                        A.idkelas,
                        A.k_status,
                        B.jumlah_sks
                    FROM v_datamhs A 
                    JOIN v_calon_wisudawan B ON (A.nim=B.nim)
                    WHERE 
                        A.tahun_masuk=$tahun_masuk AND
                        A.k_status != 'L' AND
                        A.kjur='$kjur'
                    "; 
            $jumlah_baris=$this->DB->getCountRowsOfTable ("v_datamhs A 
                                                            JOIN v_calon_wisudawan B ON (A.nim=B.nim)
                                                            WHERE 
                                                                A.tahun_masuk=$tahun_masuk AND
                                                                A.k_status != 'L' AND
                                                                A.kjur='$kjur'",'A.nim');
    }
		
		$this->RepeaterS->CurrentPageIndex=$_SESSION['currentPageCalonWisuda']['page_num'];
		$this->RepeaterS->VirtualItemCount=$jumlah_baris;
		$offset=$this->RepeaterS->CurrentPageIndex*$this->RepeaterS->PageSize;
		$limit=$this->RepeaterS->PageSize;
		if ($offset+$limit>$this->RepeaterS->VirtualItemCount) {
			$limit=$this->RepeaterS->VirtualItemCount-$offset;
		}
		if ($limit < 0) {$offset=0;$limit=10;$_SESSION['currentPageCalonWisuda']['page_num']=0;}
		$str = "$str ORDER BY A.nama_mhs ASC LIMIT $offset,$limit";				        
		$this->DB->setFieldTable(array('nim','nirm','nama_mhs','iddosen_wali','k_status','jumlah_sks'));
		$result=$this->DB->getRecord($str,$offset+1);
		$this->RepeaterS->DataSource=$result;
		$this->RepeaterS->dataBind();
                
        $this->paginationInfo->Text=$this->getInfoPaging($this->RepeaterS);
	}	
    public function printOut ($sender,$param) {		        
        $this->linkOutput->Text='';
        $this->linkOutput->NavigateUrl='#';
        
       
        $this->lblMessagePrintout->Text='';
        $this->lblPrintout->Text='Calon Wisudawan';
        $this->modalPrintOut->show();
    }
}