<template>
    <AdminLayout>
        <ModuleHeader>
            <template v-slot:icon>
                mdi-file-document-edit-outline
            </template>
            <template v-slot:name>
                PERSYARATAN PMB
            </template>
            <template v-slot:subtitle>
                TAHUN {{tahunmasuk|formatTA}}
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
                        Halaman ini berisi file-file persyaratan pendaftaran mahasiswa baru, mohon disesuaikan di filter tahun akademik, kemudian tekan refresh.
                    </v-alert>
            </template>
        </ModuleHeader> 
        <v-container v-if="dashboard=='mahasiswabaru'">
            <FormPersyaratan/>
        </v-container>
    </AdminLayout>
</template>
<script>
import {mapGetters} from 'vuex';
import AdminLayout from '@/views/layouts/AdminLayout';
import ModuleHeader from '@/components/ModuleHeader';
import FormPersyaratan from '@/components/FormPersyaratanPMB';
export default {
    name: 'FormulirPendaftaran', 
    created () {
        this.breadcrumbs = [
            {
                text:'HOME',
                disabled:false,
                href:'/dashboard/'+this.ACCESS_TOKEN
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
            this.dashboard = this.$store.getters['uiadmin/getDefaultDashboard'];   
            switch(this.dashboard)
            {
                case 'mahasiswabaru':

                break;
            }
		}
	},
    computed: {
        ...mapGetters('auth',{  
            ACCESS_TOKEN:'AccessToken',                   
            TOKEN:'Token',                                  
        }), 
        tahunmasuk()
        {
            return this.$store.getters['uiadmin/getTahunMasuk'];
        }
    },
    components:{
        AdminLayout,
        ModuleHeader,        
        FormPersyaratan
    },
}
</script>