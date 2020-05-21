<template>
    <v-row>        
        <v-col cols="4" v-for="(item,index) in daftar_persyaratan" v-bind:key="item.id">
            <v-form v-model="form_valid" ref="frmpersyaratan" lazy-validation>
                <v-card class="mx-auto" max-width="400">
                    <v-img class="white--text align-end" height="200px" :src="require('@/assets/no-image.png')"></v-img>                
                    <v-card-text class="text--primary">
                        <div>{{index}}
                            <v-file-input 
                                accept="image/jpeg,image/png" 
                                :label="item.nama_persyaratan+' (.png atau .jpg)'"
                                :rules="rule_foto"
                                show-size
                                v-model="formdata.foto"
                                @change="previewImage">
                            </v-file-input>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            color="orange"
                            text
                            @click="upload(index)"
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
        formdata:{
            foto:'',            
        },
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
        previewImage (e)
        {
            console.log(e);
        },
        upload(index)
        {
            console.log(index);
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