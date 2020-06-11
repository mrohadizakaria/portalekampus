<?php
prado::using ('Application.MainPageF');
class InformasiPendaftaran extends MainPageF {
	public function onLoad($param) {		
		parent::onLoad($param);	         
		$this->createObj('Dmaster');
		if (!$this->IsPostBack&&!$this->IsCallBack) { 		    
		    $this->lblModulHeader->Text=$this->setup->getSettingValue('default_tahun_pendaftaran');		   
		}
	}    	
}