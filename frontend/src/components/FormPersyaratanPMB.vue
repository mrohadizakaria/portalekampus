<template>
    <v-row>        
        <v-col xs="12" sm="6" md="4" v-for="(item,index) in daftar_persyaratan" v-bind:key="item.persyaratan_id">
            <FileUpload :item="item" :index="index" />
        </v-col>     
        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>   
    </v-row>
</template>
<script>
import FileUpload from '@/components/FileUploadPersyaratan';
import {mapGetters} from 'vuex';
export default {
    name:'FormPersyaratanPMB',
    created()
    {
        this.initialize();
    },
    data:()=>({
        //form        
        daftar_persyaratan:[],        

    }),
    methods: {
        initialize:async function ()
        {
            await this.$ajax.get('/spmb/pmbpersyaratan/'+this.ATTRIBUTE_USER('id'),             
                {
                    headers:{
                        Authorization:this.TOKEN
                    }
                }
            ).then(({data})=>{   
                this.daftar_persyaratan=data.persyaratan;
            })
        },                
    },
    computed:{
        ...mapGetters('auth',{                        
            TOKEN:'Token',     
            ATTRIBUTE_USER:'AtributeUser',                          
        }),
    },
    components:{
        FileUpload
    }
}
</script>