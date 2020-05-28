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
                TAHUN {{tahun_masuk|formatTA}} PROGRAM STUDI {{nama_prodi}}
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
                        Halaman ini berisi informasi pendaftaran mahasiswa baru, mohon disesuaikan di filter tahun akademik, kemudian tekan refresh.
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
                            <td colspan="5">
                                    <strong>ID:</strong>{{ item.id }}
                                    <strong>Username:</strong>{{ item.username }}
                                    <strong>created_at:</strong>{{ item.created_at|formatTanggal }}
                                    <strong>updated_at:</strong>{{ item.created_at|formatTanggal }}
                            </td>
                            <td colspan="2" class="text-right">
                                <v-btn 
                                    icon 
                                    color="warning" 
                                    title="aktifkan"
                                    :loading="btnLoading"
                                    :disabled="btnLoading" 
                                    @click.stop="aktifkan(item.id)"
                                    v-if="item.active==0">
                                    <v-icon>mdi-email-check</v-icon>
                                </v-btn>
                            </td>
                        </template>
                        <template v-slot:no-data>
                            Data belum tersedia
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>
        </v-container>
        <template v-slot:filtersidebar>
            <Filter7 v-on:changeTahunMasuk="changeTahunMasuk" v-on:changeProdi="changeProdi" />	
        </template>
    </AdminLayout>
</template>
<script>
import AdminLayout from '@/views/layouts/AdminLayout';
import ModuleHeader from '@/components/ModuleHeader';
import Filter7 from '@/components/sidebar/FilterMode7';
export default {
    name: 'PendaftaranBaru',  
    created()
    {
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
                text:'PENDAFTARAN MAHASISWA BARU',
                disabled:true,
                href:'#'
            }
        ];   
        let prodi_id=this.$store.getters['uiadmin/getProdiID'];
        this.prodi_id=prodi_id;
        this.nama_prodi=this.$store.getters['uiadmin/getProdiName'](prodi_id);
        this.tahun_masuk=this.$store.getters['uiadmin/getTahunMasuk'];        
        this.initialize();
    },
    data: () => ({ 
        firstloading:true,
        prodi_id:null,
        tahun_masuk:null,
        nama_prodi:null,
        
        breadcrumbs:[],
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
        changeTahunMasuk (tahun)
        {
            this.tahun_masuk=tahun;
        },
        changeProdi (id)
        {
            this.prodi_id=id;
        },
        initialize:async function () 
        {
            this.datatableLoading=true;            
            await this.$ajax.post('/spmb/pmb',
            {
                TA:this.tahun_masuk,
                prodi_id:this.prodi_id,
            },
            {
                headers: {
                    Authorization:this.$store.getters['auth/Token']
                }
            }).then(({data})=>{               
                this.datatable = data.pmb;                
                this.datatableLoading=false;
            });          
            this.firstloading=false;
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
        aktifkan(id)
        {
            this.btnLoading=true;
            this.$ajax.post('/kemahasiswaan/updatestatus/'+id,
                {
                    'active':1
                },
                {
                    headers:{
                        Authorization:this.$store.getters['auth/Token']
                    }
                }
            ).then(()=>{   
                this.initialize();
                this.btnLoading=false;
            }).catch(()=>{
                this.btnLoading=false;
            });
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
        Filter7    
    },
}
</script>