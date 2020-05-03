<template>
    <AdminLayout>
        <ModuleHeader>
            <v-alert
                border="top"
                colored-border
                type="info"
                elevation="2"
                >
                    teks
            </v-alert>
        </ModuleHeader>
        <v-container> 
            <v-row class="mb-4" no-gutters>
                 <v-col cols="12">
                     <v-card>
                        <v-card-title>
                            FILTER
                        </v-card-title>
                        <v-card-text>
                        
                        </v-card-text>
                     </v-card>
                 </v-col>
            </v-row>   
            <v-row class="mb-4" no-gutters>
                <v-col cols="12">
                    <v-card>
                        <v-card-text>
                            <v-text-field
                                v-model="search"
                                append-icon="mdi-database-search"
                                label="Search"
                                single-line
                                filled
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
                        class="elevation-1"
                        :loading="datatableLoading"
                        loading-text="Loading... Please wait"
                        @click:row="dataTableRowClicked"
                    >
                        <template v-slot:top>
                            <v-toolbar flat color="white">
                                <v-toolbar-title>DATA TABLE</v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                                <v-dialog v-model="dialogfrm" max-width="500px" persistent>
                                    <template v-slot:activator="{ on }">
                                        <v-btn color="primary" dark class="mb-2" v-on="on">TAMBAH</v-btn>
                                    </template>
                                    <v-form ref="frmdata" v-model="form_valid" lazy-validation>
                                        <v-card>
                                            <v-card-title>
                                                <span class="headline">{{ formtitle }}</span>
                                            </v-card-title>
                                            <v-card-text>
                                                <v-container>
                                                    <v-row>
                                                        <v-col cols="12" sm="12" md="12">
                                                            <v-text-field 
                                                                v-model="formdata.name" 
                                                                label="NAME"
                                                                filled
                                                                :rules="rule_name">
                                                            </v-text-field>
                                                        </v-col>                                    
                                                    </v-row>
                                                </v-container>
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
                                @click.stop="viewItem(item)"
                            >
                                mdi-eye
                            </v-icon>
                            <v-icon
                                small
                                class="mr-2"
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
                        <template v-slot:expanded-item="{ headers, item }">
                            <td :colspan="headers.length" class="text-center">
                                <strong>ID:</strong>{{ item.id }}
                                <strong>created_at:</strong>{{ item.created_at|formatTanggal }}
                                <strong>updated_at:</strong>{{ item.created_at|formatTanggal }}
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
import axios from "axios";
import AdminLayout from '@/views/layouts/AdminLayout';
import ModuleHeader from '@/components/ModuleHeader';
export default {
    name:'PAGE',
    created () {
        this.initialize()
    }, 
    data ()
    {
        return {
            btnLoading:false,
            datatableLoading:false,
            expanded:[],
            datatable:[],
            headers: [                        
                { text: 'ID', value: 'id' },   
                { text: 'AKSI', value: 'actions', sortable: false,width:100 },
            ],
            search:'',    

            //dialog
            dialogfrm:false,
            dialogdetailitem:false,

            //form data   
            form_valid:true,         
            formdata: {
                id:0,                        
                name:'',                        
                created_at: '',           
                updated_at: '',           

            },
            formdefault: {
                id:0,           
                name:'',                                     
                created_at: '',           
                updated_at: '',       
            },
            editedIndex: -1,

            //form rules  
            rule_name:[
                value => !!value||"Mohon untuk di isi name !!!",  
                value => /^[A-Za-z\s]*$/.test(value) || 'Name hanya boleh string dan spasi',                
            ], 
        };
    },
    methods: {
        initialize:async function () 
        {
            await this.$ajax.get('/path',{
                headers: {
                    Authorization:this.$store.getters.Token
                }
            }).then(({data})=>{                
                this.datatable = data.object;
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
        viewItem (item) {
            this.formdata=item;      
            this.dialogdetailitem=true;              
            // this.$ajax.get('/path/'+item.id,{
            //     headers: {
            //         Authorization:this.$store.getters.Token
            //     }
            // }).then(({data})=>{               
                                           
            // });                      
        },    
        editItem (item) {
            this.editedIndex = this.datatable.indexOf(item);
            this.formdata = Object.assign({}, item);
            this.dialogfrm = true
        },    
        save () {
            if (this.$refs.frmdata.validate())
            {
                this.btnLoading=true;
                if (this.editedIndex > -1) 
                {
                    this.$ajax.post('/path/'+this.formdata.id,
                        {
                            '_method':'PUT',
                            name:this.formdata.name,                       
                        },
                        {
                            headers:{
                                Authorization:this.$store.getters.Token
                            }
                        }
                    ).then(({data})=>{   
                        Object.assign(this.datatable[this.editedIndex], data.object);
                        this.closedialogfrm();
                    }).catch(()=>{
                        this.btnLoading=false;
                    });                 
                    
                } else {
                    this.$ajax.post('/path/store',
                        {
                            name:this.formdata.name,                            
                        },
                        {
                            headers:{
                                Authorization:this.$store.getters.Token
                            }
                        }
                    ).then(({data})=>{   
                        this.datatable.push(data.object);
                        this.closedialogfrm();
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
                                Authorization:this.$store.getters.Token
                            }
                        }
                    ).then(()=>{   
                        const index = this.datatable.indexOf(item);
                        this.datatable.splice(index, 1);
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
            this.$refs.frmdata.resetValidation(); 
            setTimeout(() => {
                this.formdata = Object.assign({}, this.formdefault)
                this.editedIndex = -1
                }, 300
            );
        },
    },
    computed: {
        formtitle () {
            return this.editedIndex === -1 ? 'TAMBAH DATA' : 'UBAH DATA'
        },
    },
    components:{
        AdminLayout,
        ModuleHeader,
    },
}
</script>