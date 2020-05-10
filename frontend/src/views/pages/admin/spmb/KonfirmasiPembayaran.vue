<template>
    <AdminLayout>
        <ModuleHeader>
            <template v-slot:icon>
                mdi-account-cash
            </template>
            <template v-slot:name>
                KONFIRMASI PEMBAYARAN
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
            <template v-slot:desc>
                <v-alert                                        
                    color="cyan"
                    border="left"                    
                    colored-border
                    type="info"
                    >
                        Halaman ini berisi informasi konfirmasi pembayaran mahasiswa baru, mohon disesuaikan di filter tahun akademik, kemudian tekan refresh.
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
                        loading-text="Loading... Please wait"
                    >

                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
    </AdminLayout>
</template>
<script>
import {mapGetters} from 'vuex';
import AdminLayout from '@/views/layouts/AdminLayout';
import ModuleHeader from '@/components/ModuleHeader';
export default {
    name: 'KonfirmasiPembayaran', 
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
                text:'KONFIRMASI PEMBAYARAN',
                disabled:true,
                href:'#'
            }
        ];
        this.initialize()
    },   
    data: () => ({ 
        datatableLoading:false,
        btnLoading:false,              
        //tables
        headers: [                                                
            { text: 'NAMA MAHASISWA', value: 'name',width:350,sortable:true },
            { text: 'TANGGAL TRANSFER', value: 'email',sortable:true },     
            { text: 'BANK TUJUAN', value: 'nomor_hp',sortable:true },     
            { text: 'JUMLAH', value: 'created_at',sortable:true,width:150 },     
            { text: 'NAMA PENGIRIM/PEMILIK REKENING', value: 'created_at',sortable:true,width:150 },     
            { text: 'AKSI', value: 'actions', sortable: false,width:100 },
        ],
        expanded:[],
        search:'',
        datatable:[],
    }),
    methods: {
        initialize:async function () 
        {

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
    },
}
</script>