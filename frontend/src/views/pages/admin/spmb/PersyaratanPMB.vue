<template>
    <AdminLayout pagename="spmbpersyaratanpmb" v-on:setPageData="setPageData" :dashboard="dashboard">
        <ModuleHeader>
            <template v-slot:icon>
                mdi-file-document-edit-outline
            </template>
            <template v-slot:name>
                PERSYARATAN PMB
            </template>
            <template v-slot:subtitle>
                TAHUN {{tahun_masuk|formatTA}}
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
    </AdminLayout>
</template>
<script>
import AdminLayout from '@/views/layouts/AdminLayout';
import ModuleHeader from '@/components/ModuleHeader';
import FormPersyaratan from '@/components/FormPersyaratanPMB';
export default {
    name: 'FormulirPendaftaran', 
    created()
    {
        this.dashboard = this.$store.getters['uiadmin/getDefaultDashboard'];   
    },
    mounted () {
        this.breadcrumbs = [
            {
                text:'HOME',
                disabled:false,
                href:'/dashboard/'+this.access_token
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
        this.initialize()
    },   
    data: () => ({
        access_token:null,
        token:null,
        tahun_masuk:null,

        breadcrumbs:[],        
        dashboard:null,
        search:'',
    }),
    methods : {
		initialize:async function()
		{	
            if (this.dashboard != 'mahasiswabaru' && this.dashboard !='mahasiswa')
            {
                this.datatableLoading=true;
                await this.$ajax.get('/spmb/pmbpersyaratan',{
                    headers: {
                        Authorization:this.token
                    }
                }).then(({data})=>{                                   
                    console.log(data);
                    this.datatableLoading=false;
                });  
            }                   
        },
        setPageData (data)
        {
            this.tahun_masuk=data.tahun_masuk;
            this.token=data.token;
            this.access_token=data.access_token;
        },
	},
    components:{
        AdminLayout,
        ModuleHeader,        
        FormPersyaratan
    },
}
</script>