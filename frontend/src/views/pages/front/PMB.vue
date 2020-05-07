<template>
    <FrontLayout>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center" no-gutters>
                <v-col xs="12" sm="6" md="4">
                    <h1 class="text-center display-1 font-weight-black primary--text">
                        PENDAFTARAN MAHASISWA BARU
                    </h1>                                                     
                    <v-form ref="frmpendaftaran" v-model="form_valid" lazy-validation>
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
                        </v-card>
                    </v-form>
                    <v-dialog v-model="dialogkonfirmasiemail" max-width="500px" persistent>                                    
                        <v-form ref="frmkonfirmasi" v-model="form_valid" lazy-validation>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">Konfirmasi Email</span>
                                </v-card-title>
                                <v-card-text>    
                                    <v-alert type="success">
                                        Pendaftaran Mahasiswa Baru telah dilakukan dengan sukses!!!. Selanjutnya silahkan masukan kode yang dikirim ke email ({{formkonfirmasi.email}}).
                                    </v-alert>
                                    <v-text-field 
                                        v-model="formkonfirmasi.code" 
                                        label="CODE"
                                        filled
                                        :rules="rule_code">
                                    </v-text-field>                                            
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>                                                
                                    <v-btn 
                                        color="blue darken-1" 
                                        text 
                                        @click.stop="konfirmasi" 
                                        :loading="btnLoading"
                                        :disabled="btnLoading">
                                            KONFIRMASI
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </v-dialog>   
                </v-col>
            </v-row>
        </v-container>
    </FrontLayout>
</template>
<script>
import { mapGetters } from 'vuex';
import VueRecaptcha from 'vue-recaptcha';
import FrontLayout from '@/views/layouts/FrontLayout';
export default {
    name: 'PMB',
    data: () => ({            
        btnLoading:false,
        //form
        form_valid:true,                 
        dialogkonfirmasiemail:false,                     
        formdata: {
            name:'',
            email:'',
            nomor_hp:'',
            username:'',
            password:'',
            captcha_response:''
        },     
        formdefault: {
            name:'',
            email:'',
            nomor_hp:'',
            username:'',
            password:'',
            captcha_response:''       
        },    
        formkonfirmasi:{
            email:'',
            code:''
        },
        rule_name:[
            value => !!value||"Nama Mahasiswa mohon untuk diisi !!!"
        ], 
        rule_nomorhp:[
            value => !!value||"Nomor HP mohon untuk diisi !!!",
            value => /^\+[1-9]{1}[0-9]{1,14}$/.test(value) || 'Nomor HP hanya boleh angka dan gunakan kode negara didepan seperti +6281214553388',
        ], 
        rule_email:[
            value => !!value||"Email mohon untuk diisi !!!",
            v => /.+@.+\..+/.test(v) || 'Format E-mail mohon di isi dengan benar',
        ],
        rule_username:[
            value => !!value||"Username mohon untuk diisi !!!"
        ], 
        rule_password:[
            value => !!value||"Password mohon untuk diisi !!!"
        ],        
        rule_code:[
            value => /^[0-9]+$/.test(value) || 'Code hanya boleh angka',
        ]
    }),
    methods: {
        save: async function ()
        {
            if (this.$refs.frmpendaftaran.validate())
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
                    this.formkonfirmasi.email=data.email;
                    this.btnLoading=false;    
                    this.dialogkonfirmasiemail=true;                
                }).catch(() => {                                   
                    this.btnLoading=false;
                });                                    
                this.form_valid=true;                                                                                        
                this.$refs.frmpendaftaran.resetValidation(); 
                this.formdata = Object.assign({}, this.formdefault)
            }
            this.resetRecaptcha();                        
        },
        konfirmasi: async function ()
        {
            if (this.$refs.frmkonfirmasi.validate())
            {
                this.btnLoading=true;                
                await this.$ajax.post('/spmb/pmb/konfirmasi',{                                        
                    email:this.formkonfirmasi.email,                    
                    code:this.formkonfirmasi.code,
                }).then(()=>{             
                    this.dialogkonfirmasiemail=false;       
                    this.btnLoading=false;                                                                                           
                }).catch(() => {                                   
                    this.btnLoading=false;
                });                       
                this.form_valid=true;                          
                this.$refs.frmkonfirmasi.resetValidation(); 
                this.frmkonfirmasi = Object.assign({}, {email:'',code:''});
                this.$router.replace('/login');
            }                           
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
    computed :{
        ...mapGetters('uifront',{
            sitekey: 'getCaptchaKey'
        })
    },
    components: {
        FrontLayout,
        VueRecaptcha
	}  
}
</script>