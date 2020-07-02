<template>
    <SPMBLayout>
        <ModuleHeader>
            <template v-slot:icon>
                mdi-calendar-account
            </template>
            <template v-slot:name>
                JADWAL UJIAN PMB
            </template>
            <template v-slot:subtitle>
                TAHUN PENDAFTARAN {{tahun_pendaftaran}} - SEMESTER {{nama_semester_pendaftaran}}
            </template>
            <template v-slot:breadcrumbs>
                <v-breadcrumbs :items="breadcrumbs" class="pa-0">
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>
            </template>
            <template v-slot:desc>
                <v-alert                                        
                    color="cyan"
                    border="left"                    
                    colored-border
                    type="info"
                    >
                    Berisi daftar dan pengelolaan jadwal ujian PMB.
                </v-alert>
            </template>
        </ModuleHeader>   
        <v-container>             
            <v-row class="mb-4" no-gutters>
                <v-col cols="12">
                    <v-card>
                        <v-card-text>
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-database-search"
                                label="Search"
                                single-line
                                hide-details
                            ></v-text-field>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="mb-4" no-gutters>
                <v-col cols="12">
                    <v-data-table
                        :headers="headers"
                        :items="datatable"
                        :search="search"
                        item-key="id"
                        sort-by="name"
                        show-expand
                        :expanded.sync="expanded"
                        :single-expand="true"
                        @click:row="dataTableRowClicked"
                        class="elevation-1"
                        :loading="datatableLoading"
                        loading-text="Loading... Please wait">

                        <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-toolbar-title>DAFTAR JADWAL UJIAN PMB</v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" dark class="mb-2" @click.stop="addItem">TAMBAH</v-btn>
                                <v-dialog v-model="dialogfrm" max-width="800px" persistent>
                                    <v-form ref="frmdata" v-model="form_valid" lazy-validation>
                                        <v-card>
                                            <v-card-title>
                                                <span class="headline">{{ formTitle }}</span>
                                            </v-card-title>
                                            <v-card-text>
                                                <v-text-field 
                                                    v-model="formdata.nama_kegiatan" 
                                                    label="NAMA UJIAN ONLINE"
                                                    filled
                                                    :rules="rule_nama_kegiatan">
                                                </v-text-field>  
                                                Jumlah soal, pastikan lebih kecil atau sama dengan jumlah soal BANK SOAL.                                                                            
                                                <v-text-field 
                                                    v-model="formdata.jumlah_soal" 
                                                    label="JUMLAH SOAL"
                                                    filled
                                                    :rules="rule_jumlah_ujian">
                                                </v-text-field>  
                                                <v-menu
                                                    ref="menuTanggalAkhirPendaftaran"
                                                    v-model="menuTanggalAkhirPendaftaran"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="formdata.tanggal_akhir_daftar"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="290px">
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            v-model="formdata.tanggal_akhir_daftar"
                                                            label="TANGGAL AKHIR PENDAFTARAN"                                            
                                                            readonly
                                                            filled
                                                            v-on="on"></v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        v-model="formdata.tanggal_akhir_daftar"                                        
                                                        no-title                                
                                                        scrollable>                                                        
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menuTanggalAkhirPendaftaran = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.menuTanggalAkhirPendaftaran.save(formdata.tanggal_akhir_daftar)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-menu>                                                
                                                <v-menu
                                                    ref="menuTanggalUjian"
                                                    v-model="menuTanggalUjian"
                                                    :close-on-content-click="false"
                                                    :return-value.sync="formdata.tanggal_ujian"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="290px">
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            v-model="formdata.tanggal_ujian"
                                                            label="TANGGAL UJIAN"                                            
                                                            readonly
                                                            filled
                                                            v-on="on">
                                                        </v-text-field>
                                                    </template>
                                                    <v-date-picker
                                                        v-model="formdata.tanggal_ujian"                                        
                                                        no-title                                
                                                        scrollable>                                                        
                                                        <v-spacer></v-spacer>
                                                        <v-btn text color="primary" @click="menuTanggalUjian = false">Cancel</v-btn>
                                                        <v-btn text color="primary" @click="$refs.menuTanggalUjian.save(formdata.tanggal_ujian)">OK</v-btn>
                                                    </v-date-picker>
                                                </v-menu>
                                                <v-menu
                                                    ref="menuJamMulaiUjian"
                                                    v-model="menuJamMulaiUjian"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    :return-value.sync="formdata.jam_mulai_ujian"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="290px">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                            v-model="formdata.jam_mulai_ujian"
                                                            label="JAM MULAI UJIAN"                                                            
                                                            readonly
                                                            filled
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-if="menuJamMulaiUjian"
                                                        v-model="formdata.jam_mulai_ujian"
                                                        full-width
                                                        format="24hr"
                                                        @click:minute="$refs.menuJamMulaiUjian.save(formdata.jam_mulai_ujian)"
                                                    ></v-time-picker>
                                                </v-menu>
                                                <v-menu
                                                    ref="menuJamSelesaiUjian"
                                                    v-model="menuJamSelesaiUjian"
                                                    :close-on-content-click="false"
                                                    :nudge-right="40"
                                                    :return-value.sync="formdata.jam_selesai_ujian"
                                                    transition="scale-transition"
                                                    offset-y
                                                    max-width="290px"
                                                    min-width="290px">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field
                                                            v-model="formdata.jam_selesai_ujian"
                                                            label="JAM SELESAI UJIAN"                                                            
                                                            readonly
                                                            filled
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-time-picker
                                                        v-if="menuJamSelesaiUjian"
                                                        v-model="formdata.jam_selesai_ujian"
                                                        full-width
                                                        format="24hr"
                                                        @click:minute="$refs.menuJamSelesaiUjian.save(formdata.jam_selesai_ujian)"
                                                    ></v-time-picker>
                                                </v-menu>                                                
                                                <v-text-field 
                                                    v-model="formdata.durasi_ujian" 
                                                    label="DURASI WAKTU UJIAN (menit)"
                                                    filled
                                                    :rules="rule_nama_kegiatan">
                                                </v-text-field> 
                                                <v-select
                                                    label="RUANG UJIAN"
                                                    :items="daftar_ruangan"
                                                    v-model="formdata.ruangkelas_id"
                                                    item-text="nama"
                                                    item-value="id"
                                                    filled
                                                />
                                            </v-card-text>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click.stop="closedialogfrm">BATAL</v-btn>
                                                <v-btn 
                                                    color="blue darken-1" 
                                                    text 
                                                    @click.stop="save" 
                                                    :loading="btnLoading"
                                                    :disabled="!form_valid||btnLoading">
                                                        SIMPAN
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-form>
                                </v-dialog>
                                <v-dialog v-model="dialogdetailitem" max-width="500px" persistent>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">DETAIL DATA</span>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-row no-gutters>
                                                <v-col xs="12" sm="6" md="6">
                                                    <v-card flat>
                                                        <v-card-title>ID :</v-card-title>
                                                        <v-card-subtitle>
                                                            {{formdata.id}}
                                                        </v-card-subtitle>
                                                    </v-card>
                                                </v-col>
                                                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                                                <v-col xs="12" sm="6" md="6">
                                                    <v-card flat>
                                                        <v-card-title>CREATED :</v-card-title>
                                                        <v-card-subtitle>
                                                            {{$date(formdata.created_at).format('DD/MM/YYYY HH:mm')}}
                                                        </v-card-subtitle>
                                                    </v-card>
                                                </v-col>
                                                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col xs="12" sm="6" md="6">
                                                    <v-card flat>
                                                        <v-card-title>NAME :</v-card-title>
                                                        <v-card-subtitle>
                                                            {{formdata.name}}
                                                        </v-card-subtitle>
                                                    </v-card>
                                                </v-col>
                                                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                                                <v-col xs="12" sm="6" md="6">
                                                    <v-card flat>
                                                        <v-card-title>UPDATED :</v-card-title>
                                                        <v-card-subtitle>
                                                            {{$date(formdata.updated_at).format('DD/MM/YYYY HH:mm')}}
                                                        </v-card-subtitle>
                                                    </v-card>
                                                </v-col>
                                                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                                            </v-row>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click.stop="closedialogdetailitem">KELUAR</v-btn>
                                        </v-card-actions>
                                    </v-card>                                    
                                </v-dialog>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-icon
                                small
                                class="mr-2"
                                @click.stop="viewItem(item)">
                                mdi-eye
                            </v-icon>
                            <v-icon
                                small
                                class="mr-2"
                                @click.stop="editItem(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                small
                                :loading="btnLoading"
                                :disabled="btnLoading"
                                @click.stop="deleteItem(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                        <template v-slot:expanded-item="{ headers, item }">
                            <td :colspan="headers.length" class="text-center">
                                <v-col cols="12">
                                    <strong>ID:</strong>{{ item.id }}
                                    <strong>created_at:</strong>{{ $date(item.created_at).format('DD/MM/YYYY HH:mm') }}
                                    <strong>updated_at:</strong>{{ $date(item.updated_at).format('DD/MM/YYYY HH:mm') }}
                                </v-col>                                
                            </td>
                        </template>
                        <template v-slot:no-data>
                            Data belum tersedia
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
    </SPMBLayout>
</template>
<script>
import SPMBLayout from '@/views/layouts/SPMBLayout';
import ModuleHeader from '@/components/ModuleHeader';
export default {
    name:'JadwalUjianPMB',
    created () {
        this.breadcrumbs = [
            {
                text:'HOME',
                disabled:false,
                href:'/dashboard/'+this.$store.getters['auth/AccessToken']
            },
            {
                text:'SPMB',
                disabled:false,
                href:'#'
            },
            {
                text:'JADWAL UJIAN PMB',
                disabled:true,
                href:'#'
            }
        ];
        this.tahun_pendaftaran=this.$store.getters['uiadmin/getTahunPendaftaran'];        
        this.semester_pendaftaran=this.$store.getters['uiadmin/getSemesterPendaftaran'];  
        this.nama_semester_pendaftaran=this.$store.getters['uiadmin/getNamaSemester'](this.semester_pendaftaran);  
        this.initialize()
    },  
    data () 
    { 
        let tanggal_ujian=this.$date().format('YYYY-MM-DD');
        return {
            firstloading:true,
            tahun_pendaftaran:null,
            semester_pendaftaran:null,
            nama_semester_pendaftaran:null,

            btnLoading:false,
            datatableLoading:false,
            expanded:[],
            datatable:[],
            headers: [                        
                { text: 'ID', value: 'id',width:70 },   
                { text: 'NAMA UJIAN', value: 'nama_kegiatan', sortable: true,width:300 },
                { text: 'TGL. UJIAN', value: 'tanggal_ujian', sortable: true,width:100 },
                { text: 'TGL. AKHIR PENDAFTARAN', value: 'tanggal_ujian', sortable: true,width:100 },
                { text: 'DURASI UJIAN', value: 'durasi_ujian', sortable: true,width:100 },
                { text: 'RUANGAN', value: 'nama_ruangan', sortable: true,width:100 },
                { text: 'AKSI', value: 'actions', sortable: false,width:100 },
            ],
            search:'',    

            //dialog
            dialogfrm:false,
            dialogdetailitem:false,

            //form data   
            form_valid:true, 
            daftar_ruangan:[],

            menuTanggalUjian:false,        
            menuJamMulaiUjian:false,        
            menuJamSelesaiUjian:false,        
            menuTanggalAkhirPendaftaran:false,        
            formdata: {
                id:0,                        
                nama_kegiatan:'',
                tanggal_ujian:tanggal_ujian,    
                jam_mulai_ujian:'',                    
                jam_selesai_ujian:'',                    
                tanggal_akhir_daftar:tanggal_ujian,                                                
                durasi_ujian:'',                        
                ruangkelas_id:'',                        
                ta:'',                        
                idsmt:'',                        
                status_pendaftaran:'',                        
                status_ujian:'',                        
                created_at: '',           
                updated_at: '',           

            },
            formdefault: {
                id:0,                        
                nama_kegiatan:'',             
                jumlah_soal:'',                                   
                tanggal_ujian:this.$date().format('YYYY-MM-DD'),   
                jam_mulai_ujian:'',                    
                jam_selesai_ujian:'',                              
                tanggal_akhir_daftar:tanggal_ujian,                        
                durasi_ujian:'',                        
                ruangkelas_id:'',                        
                ta:'',                        
                idsmt:'',                        
                status_pendaftaran:'',                        
                status_ujian:'',                        
                created_at: '',           
                updated_at: '',       
            },
            editedIndex: -1,

            //form rules          
            rule_nama_kegiatan:[
                value => !!value||"Mohon untuk di isi name !!!",  
                value => /^[A-Za-z\s]*$/.test(value) || 'Name hanya boleh string dan spasi',                
            ], 
            rule_jumlah_ujian:[
                value => !!value||"Mohon untuk di isi jumlah soal ujian !!!",  
                value => /^[0-9]+$/.test(value) || 'Jumlah soal ujian hanya boleh angka',
            ], 
        }
    },
    methods: {
        changeTahunPendaftaran (tahun)
        {
            this.tahun_pendaftaran=tahun;
        },
        changeSemesterPendaftaran (semester)
        {
            this.semester_pendaftaran=semester;
        },
        initialize:async function () 
        {
            this.datatableLoading=true;
            await this.$ajax.post('/spmb/jadwalujianpmb',
            {
                tahun_pendaftaran:this.tahun_pendaftaran,
                semester_pendaftaran:this.semester_pendaftaran
            },
            {
                headers: {
                    Authorization:this.$store.getters['auth/Token']
                }
            }).then(({data})=>{               
                this.datatable = data.object;
                this.datatableLoading=false;
            }).catch(()=>{
                this.datatableLoading=false;
            });  
        },
        dataTableRowClicked(item)
        {
            if ( item === this.expanded[0])
            {
                this.expanded=[];                
            }
            else
            {
                this.expanded=[item];
            }               
        },
        addItem ()
        {
            this.dialogfrm=true;
        },
        viewItem (item) {
            this.formdata=item;      
            this.dialogdetailitem=true;              
            // this.$ajax.get('/path/'+item.id,{
            //     headers: {
            //         Authorization:this.$store.getters['auth/Token']
            //     }
            // }).then(({data})=>{               
                                           
            // });                      
        },    
        editItem (item) {
            this.editedIndex = this.datatable.indexOf(item);
            this.formdata = Object.assign({}, item);
            this.dialogfrm = true;
        },    
        save:async function () {
            if (this.$refs.frmdata.validate())
            {
                this.btnLoading=true;
                if (this.editedIndex > -1) 
                {
                    await this.$ajax.post('/spmb/jadwalujianpmb/'+this.formdata.id,
                        {
                            '_method':'PUT',
                            nama_kegiatan:this.formdata.nama_kegiatan,
                            tanggal_ujian:this.formdata.tanggal_ujian,    
                            jam_mulai_ujian:this.formdata.jam_mulai_ujian,                    
                            jam_selesai_ujian:this.formdata.jam_selesai_ujian,                    
                            tanggal_akhir_daftar:this.formdata.tanggal_akhir_daftar,                                                
                            durasi_ujian:this.formdata.durasi_ujian,                        
                            ruangkelas_id:this.formdata.ruangkelas_id,                                  
                        },
                        {
                            headers:{
                                Authorization:this.$store.getters['auth/Token']
                            }
                        }
                    ).then(({data})=>{   
                        Object.assign(this.datatable[this.editedIndex], data.object);
                        this.closedialogfrm();
                        this.btnLoading=false;
                    }).catch(()=>{
                        this.btnLoading=false;
                    });                 
                    
                } else {
                    await this.$ajax.post('/spmb/jadwalujianpmb/store',
                        {               
                            nama_kegiatan:this.formdata.nama_kegiatan,
                            tanggal_ujian:this.formdata.tanggal_ujian,    
                            jam_mulai_ujian:this.formdata.jam_mulai_ujian,                    
                            jam_selesai_ujian:this.formdata.jam_selesai_ujian,                    
                            tanggal_akhir_daftar:this.formdata.tanggal_akhir_daftar,                                                
                            durasi_ujian:this.formdata.durasi_ujian,                        
                            ruangkelas_id:this.formdata.ruangkelas_id,
                            ta:this.tahun_pendaftaran,                        
                            idsmt:this.semester_pendaftaran,                                       
                        },
                        {
                            headers:{
                                Authorization:this.$store.getters['auth/Token']
                            }
                        }
                    ).then(({data})=>{   
                        this.datatable.push(data.object);
                        this.closedialogfrm();
                        this.btnLoading=false;
                    }).catch(()=>{
                        this.btnLoading=false;
                    });
                }
            }
        },
        deleteItem (item) {           
            this.$root.$confirm.open('Delete', 'Apakah Anda ingin menghapus data dengan ID '+item.id+' ?', { color: 'red' }).then((confirm) => {
                if (confirm)
                {
                    this.btnLoading=true;
                    this.$ajax.post('/path/'+item.id,
                        {
                            '_method':'DELETE',
                        },
                        {
                            headers:{
                                Authorization:this.$store.getters['auth/Token']
                            }
                        }
                    ).then(()=>{   
                        const index = this.datatable.indexOf(item);
                        this.datatable.splice(index, 1);
                        this.btnLoading=false;
                    }).catch(()=>{
                        this.btnLoading=false;
                    });
                }                
            });
        },
        closedialogdetailitem () {
            this.dialogdetailitem = false;            
            setTimeout(() => {
                this.formdata = Object.assign({}, this.formdefault)
                this.editedIndex = -1
                }, 300
            );
        },
        closedialogfrm () {
            this.dialogfrm = false;            
            setTimeout(() => {
                this.formdata = Object.assign({}, this.formdefault);                
                this.editedIndex = -1
                this.$refs.frmdata.reset(); 
                }, 300
            );
        },
    },
    computed: {        
        formTitle () {
            return this.editedIndex === -1 ? 'TAMBAH JADWAL' : 'UBAH JADWAL'
        },        
    },
    components:{
        SPMBLayout,
        ModuleHeader,        
    },

}
</script>