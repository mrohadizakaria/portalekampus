<template>
     <v-row class="mb-4" no-gutters>
        <v-col cols="12">
            <v-form ref="frmdata" v-model="form_valid" lazy-validation>
                <v-card class="mb-4">
                    <v-card-title>
                        IDENTITAS DIRI
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            label="NAMA LENGKAP"    
                            v-model="formdata.name"    
                            :rules="rule_name"
                            filled
                        />
                        <v-text-field
                            label="TEMPAT LAHIR"
                            v-model="formdata.tempat_lahir"     
                            :rules="rule_tempat_lahir"                   
                            filled
                        />
                        <v-menu
                            ref="menuTanggalLahir"
                            v-model="menuTanggalLahir"
                            :close-on-content-click="false"
                            :return-value.sync="formdata.tanggal_lahir"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="formdata.tanggal_lahir"
                                    label="TANGGAL LAHIR"                                            
                                    readonly
                                    filled
                                    v-on="on"
                                    :rules="rule_tanggal_lahir"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="formdata.tanggal_lahir"                                        
                                no-title                                
                                scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menuTanggalLahir = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menuTanggalLahir.save(formdata.tanggal_lahir)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                        <v-radio-group v-model="formdata.jk" row>
                            JENIS KELAMIN : 
                            <v-radio label="LAKI-LAKI" value="L"></v-radio>
                            <v-radio label="PEREMPUAN" value="P"></v-radio>
                        </v-radio-group>
                        <v-text-field
                            label="NOMOR HP"
                            v-model="formdata.nomor_hp"
                            filled
                            :rules="rule_nomorhp"
                        />
                        <v-text-field
                            label="EMAIL"
                            v-model="formdata.email"
                            :rules="rule_email"
                            filled
                        />
                    </v-card-text>
                </v-card>
                <v-card class="mb-4">
                    <v-card-title>
                        ALAMAT
                    </v-card-title>
                    <v-card-text>
                        <v-select
                            label="PROVINSI"
                            :items="daftar_provinsi"
                            v-model="provinsi_id"
                            item-text="nama"
                            item-value="id"
                            :loading="btnLoadingProv"
                            filled
                        />
                        <v-select
                            label="KABUPATEN/KOTA"
                            :items="daftar_kabupaten"
                            v-model="kabupaten_id"
                            item-text="nama"
                            item-value="id"
                            :loading="btnLoadingKab"
                            filled
                        />
                        <v-select
                            label="KECAMATAN"
                            :items="daftar_kecamatan"
                            v-model="kecamatan_id"
                            item-text="nama"
                            item-value="id"                            
                            filled
                        />
                        <v-select
                            label="DESA/KELURAHAN"
                            :items="daftar_desa"
                            v-model="desa_id"
                            item-text="nama"
                            item-value="id"
                            :rules="rule_desa"
                            filled
                        />
                        <v-text-field
                            label="ALAMAT RUMAH"
                            :rules="rule_alamat_rumah"
                            filled
                        />
                    </v-card-text>
                </v-card>
                <v-card class="mb-4">
                    <v-card-title>
                        PILIHAN PROGRAM STUDI
                    </v-card-title>
                    <v-card-text>
                        <v-select
                            v-model="kode_fakultas"
                            label="FAKULTAS"
                            filled
                            :rules="rule_fakultas"
                            :items="daftar_fakultas"
                            item-text="nama_fakultas"
                            item-value="kode_fakultas"
                            :loading="btnLoadingFakultas"
                            v-if="$store.getters['uifront/getBentukPT']=='universitas'"
                        />
                        <v-select
                            label="PROGRAM STUDI"
                            :items="daftar_prodi"
                            item-text="nama_prodi2"
                            item-value="id"
                            :rules="rule_prodi"
                            filled
                        />
                    </v-card-text>
                </v-card>
                <v-card class="mb-4">                    
                    <v-card-actions>
                        <v-spacer></v-spacer>                        
                        <v-btn 
                            color="blue darken-1" 
                            text 
                            @click.stop="save" 
                            :loading="btnLoading"
                            :disabled="!form_valid||btnLoading">SIMPAN</v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-col>
    </v-row>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    name:'FormMahasiswaBaru',
    created()
    {
        this.initialize();
    },
    data:()=>({
        btnLoading:false,
        btnLoadingProv:false,
        btnLoadingKab:false,
        btnLoadingKec:false,
        btnLoadingFakultas:false,
        //form
        form_valid:true,

        menuTanggalLahir:false,

        daftar_provinsi:[],
        provinsi_id:0,

        daftar_kabupaten:[],
        kabupaten_id:0,

        daftar_kecamatan:[],
        kecamatan_id:0,

        daftar_desa:[],
        desa_id:0,

        daftar_fakultas:[],
        kode_fakultas:'',

        daftar_prodi:[],
        prodi_id:'',

        formdata:{
            name:'',
            email:'',
            nomor_hp:'',
            tempat_lahir:'',
            tanggal_lahir:'',
            jk:'L',

        },
        rule_name:[
            value => !!value||"Nama Mahasiswa mohon untuk diisi !!!"
        ],         
        rule_tempat_lahir:[
            value => !!value||"Tempat Lahir mohon untuk diisi !!!"
        ], 
        rule_tanggal_lahir:[
            value => !!value||"Tanggal Lahir mohon untuk diisi !!!"
        ], 
        rule_nomorhp:[
            value => !!value||"Nomor HP mohon untuk diisi !!!",
            value => /^\+[1-9]{1}[0-9]{1,14}$/.test(value) || 'Nomor HP hanya boleh angka dan gunakan kode negara didepan seperti +6281214553388',
        ], 
        rule_email:[
            value => !!value||"Email mohon untuk diisi !!!",
            v => /.+@.+\..+/.test(v) || 'Format E-mail mohon di isi dengan benar',
        ],
        rule_desa:[
            value => !!value||"Mohon Desa mohon untuk diisi !!!"
        ], 
        rule_alamat_rumah:[
            value => !!value||"Alamat Rumah mohon untuk diisi !!!"
        ], 
        rule_fakultas:[
            value => !!value||"Fakultas mohon untuk dipilih !!!"
        ], 
        rule_prodi:[
            value => !!value||"Program studi mohon untuk dipilih !!!"
        ], 
    }),
    methods: {
        initialize:async function ()
        {
            this.$ajax.get('/datamaster/provinsi').then(({data})=>{                
                this.daftar_provinsi=data.provinsi;
            });            
            if (this.$store.getters['uifront/getBentukPT']=='universitas')
            {                
                await this.$ajax.get('/datamaster/fakultas').then(({data})=>{                    
                    this.daftar_fakultas=data.fakultas;
                });
            }
            else
            {
                await this.$ajax.get('/datamaster/programstudi').then(({data})=>{
                    this.daftar_prodi=data.prodi;
                });
            }           
            this.formdata.name = this.ATTRIBUTE_USER('name');
            this.formdata.email = this.ATTRIBUTE_USER('email');
            this.formdata.nomor_hp = this.ATTRIBUTE_USER('nomor_hp');
        },        
        save: async function ()
        {
            if (this.$refs.frmdata.validate())
            {
                this.btnLoading=true;                
                // await this.$ajax.post('/spmb/pmb/store',{                    
                //     name:this.formdata.name,
                //     email:this.formdata.email,
                //     nomor_hp:this.formdata.nomor_hp,
                //     username:this.formdata.username,
                //     password:this.formdata.password,
                //     captcha_response:this.formdata.captcha_response,
                // }).then(({data})=>{
                //     this.formkonfirmasi.email=data.email;
                //     this.btnLoading=false;    
                //     this.dialogkonfirmasiemail=true;                
                // }).catch(() => {                                   
                    this.btnLoading=false;
                // });                                    
                // this.form_valid=true;                                                                                        
                // this.$refs.frmpendaftaran.reset(); 
                // this.formdata = Object.assign({}, this.formdefault)
            }                             
        },
    },
    computed:{
        ...mapGetters('auth',{                        
            TOKEN:'Token',                      
            ATTRIBUTE_USER:'AtributeUser',               
        }),
    },
    watch:{
        provinsi_id(val)
        {
            this.btnLoadingProv=true;
            this.$ajax.get('/datamaster/provinsi/'+val+'/kabupaten').then(({data})=>{                
                this.daftar_kabupaten=data.kabupaten;
                this.btnLoadingProv=false;
            });
            this.daftar_kecamatan=[];
        },
        kabupaten_id(val)
        {
            this.btnLoadingKab=true;
            this.$ajax.get('/datamaster/kabupaten/'+val+'/kecamatan').then(({data})=>{                                
                this.daftar_kecamatan=data.kecamatan;
                this.btnLoadingKab=false;
            });
        },
        kecamatan_id(val)
        {
            this.btnLoadingKec=true;
            this.$ajax.get('/datamaster/kecamatan/'+val+'/desa').then(({data})=>{                                
                this.daftar_desa=data.desa;
                this.btnLoadingKec=false;
            });
        },
        kode_fakultas (val)
        {
            this.btnLoadingFakultas=true;
            this.$ajax.get('/datamaster/fakultas/'+val+'/programstudi').then(({data})=>{                                
                this.daftar_prodi=data.programstudi;
                this.btnLoadingFakultas=false;
            });
        }

    }
}
</script>