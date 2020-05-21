<template>
    <v-row>        
        <v-col xs="12" sm="6" md="4" v-for="(item,index) in daftar_persyaratan" v-bind:key="item.id">
            <v-form v-model="form_valid" ref="frmpersyaratan" lazy-validation>
                <v-card class="mx-auto" max-width="400">
                    <v-img class="white--text align-end" height="200px" :src="getImagePersyaratan(item)" ref="imagepersyaratan"></v-img>                
                    <v-card-text class="text--primary">
                        <div>
                            <v-file-input 
                                accept="image/jpeg,image/png" 
                                :label="item.nama_persyaratan+' (.png atau .jpg)'"
                                :rules="rule_foto"
                                show-size
                                v-model="filepersyaratan[index]"
                                @change="previewImage($event,index)">
                            </v-file-input>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn
                            color="orange"
                            text
                            @click="upload(index,item)"
                        >
                            Upload
                        </v-btn>

                        <v-btn
                            color="orange"
                            text
                        >
                            Hapus
                        </v-btn>
                    </v-card-actions>
                </v-card>            
            </v-form>            
        </v-col>     
        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>   
    </v-row>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    name:'FormPersyaratanPMB',
    created()
    {
        this.initialize();
    },
    data:()=>({
        //form
        form_valid:true,
        daftar_persyaratan:[],
        filepersyaratan:[],
        //form rules  
        rule_foto:[
            value => !!value||"Mohon pilih gambar !!!",  
            value =>  !value || value.size < 2000000 || 'File foto harus kurang dari 2MB.'                
        ], 

    }),
    methods: {
        initialize:async function ()
        {
            await this.$ajax.post('/datamaster/persyaratan/pmb/proses',             
                {
                    prodi_id:0
                },
            ).then(({data})=>{   
                this.daftar_persyaratan=data.persyaratan;
            })
        },
        getImagePersyaratan(item)
        {
            console.log(item);
            return require('@/assets/no-image.png');
        },
        previewImage (e,index)
        {
            let image = this.$refs.imagepersyaratan[index];
            let reader = new FileReader();
            reader.readAsDataURL(e);
            reader.onload = img => {                    
                image.src=img.target.result;
            }
            // console.log(image);            
            // console.log(e);            
            // console.log(index);            
        },
        upload(index,item)
        {
            let data = item;   
            if (this.$refs.frmpersyaratan[index].validate())
            {
                if (typeof this.filepersyaratan[index] !== 'undefined')
                {
                    console.log(data);        
                    console.log(this.filepersyaratan[index]);                    
                }               
            }            
        }
    },
    computed:{
        ...mapGetters('auth',{                        
            TOKEN:'Token',                      
            ATTRIBUTE_USER:'AtributeUser',               
        }),
    },
}
</script>