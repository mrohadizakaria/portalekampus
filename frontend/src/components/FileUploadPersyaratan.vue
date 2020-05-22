<template>
    <v-form v-model="form_valid" ref="frmpersyaratan" lazy-validation>
        <v-card class="mx-auto" max-width="400">
            <v-img class="white--text align-end" height="200px" :src="photoPersyaratan"></v-img>                
            <v-card-text class="text--primary">
                <div>
                    <v-file-input 
                        accept="image/jpeg,image/png" 
                        :label="item.nama_persyaratan+' (.png atau .jpg)'"
                        :rules="rule_foto"
                        show-size
                        v-model="filepersyaratan[index]"
                        @change="previewImage">
                    </v-file-input>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    color="orange"
                    text
                    @click="upload(index,item)"
                    :loading="btnLoading"                                
                    :disabled="btnLoading">                
                    Upload
                </v-btn>

                <v-btn
                    color="orange"
                    text
                    :loading="btnLoading"                                
                    :disabled="btnLoading">                
                    Hapus
                </v-btn>
            </v-card-actions>
        </v-card>            
    </v-form>        
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    name:'FileUploadPersyaratan',
    created ()
    {
        if (this.item.path == null)
        {
            this.image_prev=this.item.path;
        }
        else
        {
            this.image_prev=this.$api.url+'/'+this.item.path;
        }
        
    },
    props:{
        index:Number,
        item:Object
    },
    data:()=>({        
        btnLoading:false,
        image_prev:null,
        //form
        form_valid:true,
        filepersyaratan:[],
        //form rules  
        rule_foto:[
            value => !!value||"Mohon pilih gambar !!!",  
            value =>  !value || value.size < 2000000 || 'File foto harus kurang dari 2MB.'                
        ],
    }),
    methods: {
        previewImage (e)
        {
            if (typeof e === 'undefined')
            {
                this.image_prev=null;
            }
            else
            {
                let reader = new FileReader();
                reader.readAsDataURL(e);
                reader.onload = img => {                    
                    this.image_prev=img.target.result;
                }
            }          
        },
        upload:async function (index,item)
        {
            let data = item;   
            if (this.$refs.frmpersyaratan.validate())
            {
                if (typeof this.filepersyaratan[index] !== 'undefined')
                {
                    this.btnLoading=true;
                    var formdata = new FormData();                    
                    formdata.append('nama_persyaratan',data.nama_persyaratan);
                    formdata.append('persyaratan_id',data.persyaratan_id);
                    formdata.append('persyaratan_pmb_id',data.persyaratan_pmb_id);
                    formdata.append('foto',this.filepersyaratan[index]);
                    await this.$ajax.post('/spmb/pmbpersyaratan/upload/'+this.ATTRIBUTE_USER('id'),formdata,                    
                        {
                            headers:{
                                Authorization:this.TOKEN,      
                                'Content-Type': 'multipart/form-data'                      
                            }
                        }
                    ).then(()=>{                           
                        this.btnLoading=false;                        
                    }).catch(()=>{
                        this.btnLoading=false;
                    });                    
                }               
            }            
        }
    },
    computed: {
        ...mapGetters('auth',{                                
            TOKEN:'Token',  
            ATTRIBUTE_USER:'AtributeUser',                                 
        }), 
        photoPersyaratan:{
            get ()
            {   
                if (this.image_prev==null)
                {
                    return require('@/assets/no-image.png');
                }
                else
                {
                    return this.image_prev;
                }
            },
            set (val)
            {
                this.image_prev=val;
            }
            
        },
    }
}
</script>