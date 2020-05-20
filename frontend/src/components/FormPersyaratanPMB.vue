<template>
    <v-row no-gutters>
        <v-col cols="12">
            <v-form ref="frmdata" v-model="form_valid" lazy-validation>
                <v-card class="mb-4">
                    <v-card-text>
                        <v-select
                            label="JENIS PERSYARATAN"
                            :items="daftar_persyaratan"
                            v-model="persyaratan_id"
                            item-text="nama_persyaratan"
                            item-value="id"                                                        
                            filled
                        />
                    </v-card-text>
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
        persyaratan_id:'',        

        formdata:{
            nama_persyaratan:'',            
        },

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