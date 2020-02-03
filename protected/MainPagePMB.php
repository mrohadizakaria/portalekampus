<?php
class MainPagePMB extends MainPage {
    /**
     * show page soal PMB [datamaster]
     */
    public $showSoalPMB=false;    
    
    /**
     * show page perwalian [akademik perwalian]
     */
    public $showPerwalian=false;
    /**
     * show sub menu akademik daftar ulang [akademik daftar ulang calon mahasiswa]
     */
    public $showCalonMHS=false;
    /**
     * show sub menu akademik daftar ulang [akademik daftar ulang mahasiswa baru]
     */
    public $showDulangMHSBaru=false;
    /**
     * show sub menu akademik daftar ulang [akademik daftar ulang mahasiswa ekstension]
     */
    public $showDulangMHSEkstension=false;
    /**
     * show sub menu akademik daftar ulang [akademik daftar ulang mahasiswa aktif]
     */
    public $showDulangMHSAktif=false;
    /**
     * show sub menu akademik daftar ulang [akademik daftar ulang mahasiswa non aktif]
     */
    public $showDulangMHSNonAktif=false;
    /**
     * show sub menu akademik daftar ulang [akademik daftar ulang mahasiswa cuti]
     */
    public $showDulangMHSCuti=false;
    /**
     * show sub menu akademik daftar ulang [akademik daftar ulang mahasiswa lulus]
     */
    public $showDulangMHSLulus=false;    
    /**
     * show sub menu akademik daftar ulang [akademik daftar ulang mahasiswa drop out]
     */
    public $showDulangMHSDropOut=false;
    /**
     * show sub menu akademik daftar ulang [akademik daftar ulang mahasiswa keluar]
     */
    public $showDulangMHSKeluar=false;
    /**
     * show page PIN [spmb]
     */
    public $showPIN=false;
    /**
     * show page Pendaftaran Online [spmb]
     */
    public $showPendaftaranOnline=false;
    /**
     * show page formulir pendaftaran [spmb pendaftaran]
     */
    public $showFormulirPendaftaran=false;
    /**
     * show sub menu spmb Ujian PMB
     */
    public $showSubMenuSPMBUjianPMB=false;
    /**
     * show page Jadwal Ujian PMB [spmb]
     */
    public $showJadwalUjianPMB=false;
    /**
     * show page passing grade [spmb ujian PMB]
     */
    public $showPassingGradePMB=false;
    /**
     * show page nilai ujian [ujian PMB]
     */
    public $showNilaiUjianPMB=false;
    /**
     * show sub menu keuangan pembayaran formulir [keuangan]
     */
    public $showPembayaranFormulir=false;
    
	public function onLoad ($param) {
		parent::onLoad($param);
        if (!$this->IsPostBack&&!$this->IsCallBack) {
        }
	}
}