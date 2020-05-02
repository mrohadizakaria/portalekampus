<template>
    <FrontLayout>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center" no-gutters>
                <v-col xs="12" sm="6" md="4">
                    <h1 class="text-center display-1 font-weight-black primary--text">
                        PENDAFTARAN MAHASISWA BARU
                    </h1>                                                     
                    <v-form ref="frmlogin" lazy-validation>
                        <v-card outlined>
                            <v-card-text>                                
                                <v-text-field 
                                    v-model="formdata.name"
                                    label="NAMA LENGKAP" 
                                    :rules="rule_name"
                                    outlined 
                                    dense />                               
                                <v-text-field 
                                    v-model="formdata.nomor_hp"
                                    label="NOMOR HP" 
                                    :rules="rule_nomorhp"
                                    outlined 
                                    dense />                               
                                <v-text-field 
                                    v-model="formdata.email"
                                    label="EMAIL" 
                                    :rules="rule_email"
                                    outlined 
                                    dense />                               
                                <v-text-field 
                                    v-model="formdata.username"
                                    label="USERNAME" 
                                    :rules="rule_username"
                                    outlined 
                                    dense />   
                                <v-text-field 
                                    v-model="formdata.password"
                                    label="PASSWORD" 
                                    type="password"         
                                    :rules="rule_password"                
                                    outlined 
                                    dense />  
                                    <v-alert color="error" class="mb-0" text v-if="formdata.captcha_response.length<=0">
                                        Mohon dicentang Google Captcha    
                                    </v-alert>
                            </v-card-text>                            
                            <v-card-actions class="justify-center">
                                <vue-recaptcha 
                                    ref="recaptcha"
                                    :sitekey="sitekey" 
                                    @verify="onVerify"
                                    @expired="onExpired"
                                    :loadRecaptchaScript="true">
                                </vue-recaptcha>                                                                   
                            </v-card-actions>                            
                            <v-card-actions class="justify-center">                                
                                 <v-btn 
                                    color="primary" 
                                    @click="save" 
                                    :loading="btnLoading"
                                    :disabled="btnLoading"
                                    block>
                                        DAFTAR
                                </v-btn>	                                 
                            </v-card-actions>
                            <v-card-actions>
                                <v-btn 
                                    color="default"                                     
                                    block>
                                        KONFIRMASI ULANG EMAIL
                                </v-btn>	
                            </v-card-actions>
                        </v-card>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </FrontLayout>
</template>
<script>
import VueRecaptcha from 'vue-recaptcha';
import FrontLayout from '@/views/layouts/FrontLayout';
export default {
    name: 'PMB',
    data: () => ({            
        btnLoading:false,
        //form
        form_error:false,
        sitekey:'6LemEfEUAAAAAOabmlDlsVEv8xXdzNJywGRxiQvN',        
        formdata: {
            name:'',
            email:'',
            nomor_hp:'',
            username:'',
            password:'',
            captcha_response:''
        },         
        rule_name:[
            value => !!value||"Nama Mahasiswa mohon untuk diisi !!!"
        ], 
        rule_nomorhp:[
            value => !!value||"Nomor HP mohon untuk diisi !!!"
        ], 
        rule_email:[
            value => !!value||"Email mohon untuk diisi !!!"
        ],
        rule_username:[
            value => !!value||"Username mohon untuk diisi !!!"
        ], 
        rule_password:[
            value => !!value||"Password mohon untuk diisi !!!"
        ]
    }),
    methods: {
        save: async function ()
        {
            if (this.$refs.frmlogin.validate())
            {
                this.btnLoading=true;                
                await this.$ajax.post('/spmb/pmb/store',{                    
                    name:this.formdata.name,
                    email:this.formdata.email,
                    nomor_hp:this.formdata.nomor_hp,
                    username:this.formdata.username,
                    password:this.formdata.password,
                    captcha_response:this.formdata.captcha_response,
                }).then(({data})=>{
                    console.log(data);                    
                    this.btnLoading=false;
                    this.form_error=false;                                                                              
                }).catch(() => {               
                    this.form_error=true;
                    this.btnLoading=false;
                });                                              
            }
            this.resetRecaptcha();
        },
        onVerify: function (response) {
            this.formdata.captcha_response=response;            
        },
        onExpired: function () {
            this.formdata.captcha_response='';
        },
        resetRecaptcha()
        {
            this.$refs.recaptcha.reset();  
            this.formdata.captcha_response='';
        }
    },
    components: {
        FrontLayout,
        VueRecaptcha
	}  
}
</script>