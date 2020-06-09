<template>
    <AdminLayout>
        <ModuleHeader>
            <template v-slot:icon>
                mdi-account
            </template>
            <template v-slot:name>
                USER PROFILE
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
                        berisi informasi profile user.
                </v-alert>
            </template>
        </ModuleHeader>   
        <v-container>    
            <v-row class="mb-4" no-gutters>
                <v-col md="12">
                    <v-card>
                        <v-card-text>
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                        <tr>
                                            <td width="150">ID</td>
                                            <td>{{$store.getters['auth/AttributeUser']('id')}}</td>
                                            <td width="150">EMAIL</td>
                                            <td>{{$store.getters['auth/AttributeUser']('email')}}</td>
                                        </tr>
                                        <tr>
                                            <td width="150">USERNAME</td>
                                            <td>{{$store.getters['auth/AttributeUser']('username')}}</td>
                                            <td width="150">CREATED</td>
                                            <td>{{$store.getters['auth/AttributeUser']('created_at')|formatTanggal}}</td>
                                        </tr>
                                         <tr>
                                            <td width="150">NAMA</td>
                                            <td>{{$store.getters['auth/AttributeUser']('name')}}</td>
                                            <td width="150">UPDATED</td>
                                            <td>{{$store.getters['auth/AttributeUser']('updated_at')|formatTanggal}}</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row> 
                <v-col sm="5" md="5">
                    
                </v-col>
            </v-row>
        </v-container>
    </AdminLayout>
</template>
<script>
import AdminLayout from '@/views/layouts/AdminLayout';
import ModuleHeader from '@/components/ModuleHeader';
export default {
    name:'UsersProfile',
    created () {
        this.breadcrumbs = [
            {
                text:'HOME',
                disabled:false,
                href:'/dashboard/'+this.$store.getters['auth/AccessToken']
            },
            {
                text:'SYSTEM',
                disabled:false,
                href:'#'
            },
            {
                text:'PROFILE USER',
                disabled:true,
                href:'#'
            }
        ];
    }, 
    data ()
    {
        return {
            btnLoading:false,
            datatable:[],
            avatar : null,
            //form data   
            form_valid:true,         
            formdata: {
                id:0,                        
                foto:null,                        
                created_at: '',           
                updated_at: '',           
            },
            formdefault: {
                id:0,           
                foto:null,                                     
                created_at: '',           
                updated_at: '',       
            },
            //form rules  
            rule_foto:[
                value => !!value||"Mohon pilih gambar !!!",  
                value =>  !value || value.size < 2000000 || 'File foto harus kurang dari 2MB.'                
            ], 
        };
    },
    methods: {
        previewImage (e)
        {
            if (typeof e === 'undefined')
            {
                this.avatar=null;
            }
            else
            {
                let reader = new FileReader();
                reader.readAsDataURL(e);
                reader.onload = img => {                    
                    this.photoUser=img.target.result;
                }
            }            
            
        },
        uploadFoto:async function () 
        {
            if (this.$refs.frmuploadfoto.validate())
            {
                if (this.formdata.foto)
                {                
                    this.btnLoading=true;
                    var formdata = new FormData();
                    formdata.append('foto',this.formdata.foto);
                    await this.$ajax.post('/setting/users/uploadfoto/'+this.$store.getters.User.id,formdata,                    
                        {
                            headers:{
                                Authorization:this.$store.getters.Token,      
                                'Content-Type': 'multipart/form-data'                      
                            }
                        }
                    ).then(({data})=>{                           
                        this.btnLoading=false;
                        this.$store.dispatch('updateFoto',data.user.foto);
                    }).catch(()=>{
                        this.btnLoading=false;
                    });    
                }   
            }
        },
        resetFoto:async function () 
        {
            this.btnLoading=true;
            await this.$ajax.post('/setting/users/resetfoto/'+this.$store.getters.User.id,{},                    
                {
                    headers:{
                        Authorization:this.$store.getters.Token,                                             
                    }
                }
            ).then(({data})=>{                           
                this.btnLoading=false;
                this.$store.dispatch('updateFoto',data.user.foto);
            }).catch(()=>{
                this.btnLoading=false;
            });    
        }
        
    },
    computed:{        
		photoUser: {
            get()
            {
                if (this.avatar==null)
                {
                    let photo = this.$api.url+'/'+this.$store.getters.User.foto;			
                    return photo;
                }
                else
                {
                   return this.avatar;
                }
                
            },
            set(val)
            {   
                this.avatar = val;
            }
		}
    },
    components:{
        AdminLayout,
        ModuleHeader,
    },
}
</script>