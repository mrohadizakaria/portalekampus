<template>
    <AdminLayout :ismhsbaru="$store.getters['uifront/getBentukPT']">
        <ModuleHeader>
            <template v-slot:icon>
                mdi-file-document-edit-outline
            </template>
            <template v-slot:name>
                PERSYARATAN PMB
            </template>
            <template v-slot:subtitle>
                TAHUN {{tahun_masuk|formatTA}} PROGRAM STUDI {{nama_prodi}}
            </template>
            <template v-slot:breadcrumbs>
                <v-breadcrumbs :items="breadcrumbs" class="pa-0">
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>
            </template>
            <template v-slot:desc v-if="dashboard=='mahasiswabaru'">
                <v-alert                                        
                    color="cyan"
                    border="left"                    
                    colored-border
                    type="info"
                    >
                        Halaman ini digunakan untuk upload peryaratan pendaftaran, mohon diisi dengan lengkap dan benar.
                    </v-alert>
            </template>
            <template v-slot:desc v-else>
                <v-alert                                        
                    color="cyan"
                    border="left"                    
                    colored-border
                    type="info"
                    >
                        Halaman ini berisi file-file persyaratan pendaftaran yang diupload oleh mahasiswa baru, mohon disesuaikan di filter tahun akademik, kemudian tekan refresh.
                    </v-alert>
            </template>
        </ModuleHeader> 
        <v-container v-if="dashboard=='mahasiswabaru'">
            <FormPersyaratan/>
        </v-container>
        <v-container v-else>
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
        </v-container>
        <template v-slot:filtersidebar v-if="$store.getters['auth/getRoleName']!='mahasiswabaru'">
            <Filter7 v-on:changeTahunMasuk="changeTahunMasuk" v-on:changeProdi="changeProdi" />	
        </template>
    </AdminLayout>
</template>
<script>
import AdminLayout from '@/views/layouts/AdminLayout';
import ModuleHeader from '@/components/ModuleHeader';
import FormPersyaratan from '@/components/FormPersyaratanPMB';
import Filter7 from '@/components/sidebar/FilterMode7';
export default {
    name: 'PersyaratanPMB', 
    created () {
        this.dashboard = this.$store.getters['uiadmin/getDefaultDashboard'];   
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
                text:'FORMULIR PENDAFTARAN',
                disabled:true,
                href:'#'
            }
        ];
        let prodi_id=this.$store.getters['uiadmin/getProdiID'];
        this.prodi_id=prodi_id;
        this.nama_prodi=this.$store.getters['uiadmin/getProdiName'](prodi_id);
        this.tahun_masuk=this.$store.getters['uiadmin/getTahunMasuk'];
        this.initialize()
    },   
    data: () => ({
        firstloading:true,
        prodi_id:null,
        tahun_masuk:null,
        nama_prodi:null,

        breadcrumbs:[],        
        dashboard:null,
        search:'',
    }),
    methods : {
        changeTahunMasuk (tahun)
        {
            this.tahun_masuk=tahun;
        },
        changeProdi (id)
        {
            this.prodi_id=id;
        },
		initialize:async function()
		{	
            if (this.dashboard != 'mahasiswabaru' && this.dashboard !='mahasiswa')
            {
                this.datatableLoading=true;
                await this.$ajax.get('/spmb/pmbpersyaratan',{
                    headers: {
                        Authorization:this.$store.getters['auth/Token']
                    }
                }).then(({data})=>{                                   
                    console.log(data);
                    this.datatableLoading=false;
                });  
            }                   
        },
    },
    watch:{
        tahun_masuk()
        {
            if (!this.firstloading)
            {
                this.initialize();
            }            
        },
        prodi_id(val)
        {
            if (!this.firstloading)
            {
                this.nama_prodi=this.$store.getters['uiadmin/getProdiName'](val);
                this.initialize();
            }            
        }
    },
    components:{
        AdminLayout,
        ModuleHeader,        
        FormPersyaratan,
        Filter7
    },
}
</script>