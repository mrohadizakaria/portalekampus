<template>
    <AdminLayout pagename="spmbformulirpendaftaran" v-on:setPageData="setPageData">
        <ModuleHeader>
            <template v-slot:icon>
                mdi-file-document-edit-outline
            </template>
            <template v-slot:name>
                FORMULIR PENDAFTARAN
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
                        Halaman ini berisi pengisian formulir pendaftaran, mohon diisi dengan lengkap dan benar.
                    </v-alert>
            </template>
            <template v-slot:desc v-else>
                <v-alert                                        
                    color="cyan"
                    border="left"                    
                    colored-border
                    type="info"
                    >
                        Halaman ini berisi informasi pengisian formulir pendaftaran mahasiswa baru, mohon disesuaikan di filter tahun akademik, kemudian tekan refresh.
                    </v-alert>
            </template>
        </ModuleHeader> 
        <v-container v-if="dashboard=='mahasiswabaru'">
            <FormMhsBaru/>
        </v-container>
    </AdminLayout>
</template>
<script>
import AdminLayout from '@/views/layouts/AdminLayout';
import ModuleHeader from '@/components/ModuleHeader';
import FormMhsBaru from '@/components/FormMahasiswaBaru';
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

        //form
        form_valid:true,
        frmmhsbaru:{

        }
    }),
    methods : {
		initialize:async function()
		{	
            switch(this.dashboard)
            {
                case 'mahasiswabaru':

                break;
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
        FormMhsBaru
    },
}
</script>