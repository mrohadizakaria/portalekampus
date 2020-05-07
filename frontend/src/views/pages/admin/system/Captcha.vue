<template>
    <AdminLayout>
		<ModuleHeader>
            <template v-slot:icon>
                mdi-google-circles-group
            </template>
            <template v-slot:name>
                CAPTCHA
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
                    Setting pengaman dari spammer menggunakan captcha
                    </v-alert>
            </template>
        </ModuleHeader> 
        <v-container>  
            <v-row class="mb-4" no-gutters>
                <v-col cols="12">
                    <v-form ref="frmdata" v-model="form_valid" lazy-validation>
                        <v-card>
                            <v-card-title>
                                Google Recaptcha
                            </v-card-title>
                            <v-card-text>
                                <v-text-field 
                                    v-model="formdata.publicKey" 
                                    label="PUBLIC KEY"
                                    filled
                                    :rules="rule_public_key">
                                </v-text-field>                                                                                               
                                <v-text-field 
                                    v-model="formdata.privateKey" 
                                    label="PRIVATE KEY"
                                    filled
                                    :rules="rule_private_key">
                                </v-text-field>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>                                
                                <v-btn 
                                    color="blue darken-1" 
                                    text 
                                    @click.stop="save" 
                                    :loading="btnLoading"
                                    :disabled="!form_valid||btnLoading">SIMPAN</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-form>
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
    name: 'Captcha',
    created()
    {
        this.breadcrumbs = [
            {
                text:'HOME',
                disabled:false,
                href:'/dashboard/'+this.ACCESS_TOKEN
            },
            {
                text:'SERVER',
                disabled:false,
                href:'#'
            },
            {
                text:'CAPTCHA',
                disabled:true,
                href:'#'
            }
        ];
        this.initialize();
    },
    data: () => ({
        breadcrumbs:[],
        datatableLoading:false,
        btnLoading:false,   
        //form
        form_valid:true,   
        formdata: {
            publicKey:'',
            privateKey:''
        },
        //form rules        
        rule_public_key:[
            value => !!value||"Mohon untuk di isi public key !!!",             
        ], 
        rule_private_key:[
            value => !!value||"Mohon untuk di isi private key !!!",              
        ], 
    }),
    methods: {
        initialize:async function () 
        {
            this.datatableLoading=true;
            await this.$ajax.get('/system/setting/variables',
            {
                headers: {
                    Authorization:this.TOKEN
                }
            }).then(({data})=>{  
                let setting = data.setting;             
                this.formdata.publicKey=setting.captcha_public_key;
                this.formdata.privateKey=setting.captcha_private_key;
            });          
            
        },
        save () {
            if (this.$refs.frmdata.validate())
            {
                this.btnLoading=true;
                this.$ajax.post('/system/setting/variables',
                    {
                        '_method':'PUT', 
                        'pid':'captcha google',
                        setting:JSON.stringify({
                            401:this.formdata.publicKey,
                            402:this.formdata.privateKey,
                        }),                                                                                                                            
                    },
                    {
                        headers:{
                            Authorization:this.TOKEN
                        }
                    }
                ).then(({data})=>{   
                    console.log(data);
                    this.btnLoading=false;
                }).catch(()=>{
                    this.btnLoading=false;
                });        
            }
        }
    },
    computed:{ 
        ...mapGetters('auth',{            
            ACCESS_TOKEN:'AccessToken',          
            TOKEN:'Token',                                  
        }),
    },
    components:{
		AdminLayout,
        ModuleHeader,        
	}
}
</script>