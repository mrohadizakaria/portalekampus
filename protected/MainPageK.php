<?php
class MainPageK extends MainPage {      
    /**     
     * show page rekening [datamaster]
     */
    public $showRekening=false;
    /**
     * show menu SPMB [spmb]
     */
    public $showMenuSPMB=false;
    /**
     * show page Pendaftaran Online [spmb]
     */
    public $showPendaftaranOnline=false;
    /**
     * show page PIN [spmb]
     */
    public $showPIN=false;
    /**
     * show page Pembayaran Formulir [spmb]
     */
    public $showPembayaranFormulir=false;
    /**     
     * show page komponen biaya per TA [datamaster]
     */
    public $showKombiPerTA=false;
    /**     
     * show page pembayaran 
     */
    public $showMenuPembayaran=false;
    /**     
     * show page pembayaran mahasiswa baru [pembayaran]
     */
    public $showPembayaranMahasiswaBaru=false;
    /**     
     * show page pembayaran semester Ganjil [pembayaran]
     */
    public $showPembayaranSemesterGanjil=false;
    /**     
     * show page pembayaran semester Fenap [pembayaran]
     */
    public $showPembayaranSemesterGenap=false;
    /**     
     * show page pembayaran semester Pendek [pembayaran]
     */
    public $showPembayaranSemesterPendek=false;
     /**     
     * show page pembayaran Cuti semester Ganjil [pembayaran]
     */
    public $showPembayaranCutiSemesterGanjil=false;
     /**     
     * show page pembayaran Cuti semester Genap [pembayaran]
     */
    public $showPembayaranCutiSemesterGenap=false;
    /**     
     * show page pembayaran semester Ganjil [pembayaran]
     */
    public $showPembayaranPiutangSemesterGanjil=false;
    /**     
     * show page pembayaran semester Fenap [pembayaran]
     */
    public $showPembayaranPiutangSemesterGenap=false;
    /**     
     * show page rekap pembayaran ganjil [report]
     */
    public $showReportRekapPembayaranGanjil=false;
     /**     
     * show page rekap pembayaran genap [report]
     */
    public $showReportRekapPembayaranGenap=false;
     /**     
     * show page rincian pembayaran genap [report]
     */
    public $showReportRincianPembayaranGenap=false;
    /**     
     * show page piutang jangka pendek [report]
     */
    public $showReportPiutangJangkaPendek=false;
    /**     
     * show page pembayaran piutang tertagih semester ganjil [report]
     */
    public $showPembayaranPiutangTertagihGanjil=false;
    /**     
     * show page pembayaran piutang tertagih semester genap[report]
     */
    public $showPembayaranPiutangTertagihGenap=false;
    /**     
     * show page pembayaran piutang tidak tertagih semester ganjil [report]
     */
    public $showPembayaranPiutangTidakTertagihGanjil=false;
    /**     
     * show page pembayaran piutang tidak tertagih semester genap[report]
     */
    public $showPembayaranPiutangTidakTertagihGenap=false;
    
    /**     
     * show page pembayaran piutang tidak tertagih semester ganjil dulang [report]
     */
    public $showPembayaranPiutangTidakTertagihGanjilDulang=false;

	public function onLoad ($param) {		
		parent::onLoad($param);				
        if (!$this->IsPostBack&&!$this->IsCallBack) {	
            
        }
	}   
}