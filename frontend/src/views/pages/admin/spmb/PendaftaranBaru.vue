<template>
    <AdminLayout>
        <ModuleHeader>
            <template v-slot:icon>
                mdi-account-plus
            </template>
            <template v-slot:name>
                PENDAFTARAN MAHASISWA BARU 
            </template>
            <template v-slot:subtitle>
                TAHUN {{tahunmasuk}}
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
                        Halaman ini berisi informasi pendaftaran mahasiswa baru, mohon disesuiakan di filter tahun akademik, kemudian tekan refresh.
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
                        <template v-slot:item.actions="{ item }">
                            <v-icon
                                small
                                class="mr-2"
                                :loading="btnLoading"
                                :disabled="btnLoading"
                                @click.stop="viewItem(item)"
                            >
                                mdi-eye
                            </v-icon>
                            <v-icon
                                small
                                class="mr-2"
                                :loading="btnLoading"
                                :disabled="btnLoading"
                                @click.stop="editItem(item)"
                            >
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                small
                                :loading="btnLoading"
                                :disabled="btnLoading"
                                @click.stop="deleteItem(item)"
                            >
                                mdi-delete
                            </v-icon>
                        </template>
                        <template v-slot:item.foto="{ item }">    
                            <v-badge
                                    bordered
                                    :color="badgeColor(item)"
                                    :icon="badgeIcon(item)"
                                    overlap
                                >                
                                    <v-avatar size="30">                                        
                                        <v-img :src="$api.url+'/'+item.foto" />                                                                     
                                    </v-avatar>                                                                                                  
                            </v-badge>
                        </template>
                        <template v-slot:item.created_at="{ item }">                            
                            {{item.created_at|formatTanggal}}
                        </template>
                        <template v-slot:expanded-item="{ headers, item }">
                            <td :colspan="headers.length" class="text-center">
                                <v-col cols="12">
                                    <strong>ID:</strong>{{ item.id }}
                                    <strong>created_at:</strong>{{ item.created_at|formatTanggal }}
                                    <strong>updated_at:</strong>{{ item.created_at|formatTanggal }}
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
    </AdminLayout>
</template>
<script>
import {mapGetters} from 'vuex';
import AdminLayout from '@/views/layouts/AdminLayout';
import ModuleHeader from '@/components/ModuleHeader';

export default {
    name: 'PendaftaranBaru',  
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
                text:'PENDAFTARAN MAHASISWA BARU',
                disabled:true,
                href:'#'
            }
        ];
        this.initialize()
    },     
    props:[
        'tahun_masuk'
    ],
    data: () => ({ 
        datatableLoading:false,
        btnLoading:false,              
        //tables
        headers: [                        
            { text: '', value: 'foto' },            
            { text: 'NAMA MAHASISWA', value: 'name',width:350,sortable:true },
            { text: 'EMAIL', value: 'email',sortable:true },     
            { text: 'NOMOR HP', value: 'nomor_hp',sortable:true },     
            { text: 'TGL.DAFTAR', value: 'created_at',sortable:true,width:150 },     
            { text: 'AKSI', value: 'actions', sortable: false,width:100 },
        ],
        expanded:[],
        search:'',
        datatable:[],
    }),
    methods: {
        initialize:async function () 
        {
            this.datatableLoading=true;
            await this.$ajax.post('/spmb/pmb',
            {
                TA:this.tahunmasuk,
            },
            {
                headers: {
                    Authorization:this.TOKEN
                }
            }).then(({data})=>{               
                this.datatable = data.pmb;                
                this.datatableLoading=false;
            });          
        },  
        badgeColor(item)
        {
            return item.active == 1 ? 'success':'error'
        },
        badgeIcon(item)
        {
            return item.active == 1 ? 'mdi-check-bold':'mdi-close-thick'
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
        viewItem (item) {           
            console.log(item);
        },
        editItem (item) { 
            console.log(item);
        },          
        deleteItem (item) {           
            this.$root.$confirm.open('Delete', 'Apakah Anda ingin menghapus MAHASISWA BARU '+item.name+' ?', { color: 'red' }).then((confirm) => {
                if (confirm)
                {
                    this.btnLoading=true;
                    this.$ajax.post('/spmb/pmb/'+item.id,
                        {
                            '_method':'DELETE',
                        },
                        {
                            headers:{
                                Authorization:this.TOKEN
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