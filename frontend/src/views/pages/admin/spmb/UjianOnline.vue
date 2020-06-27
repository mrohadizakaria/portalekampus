<template>
    <div>
        <v-system-bar app dark class="brown darken-2 white--text">
            
		</v-system-bar>	
        <v-main>
            <v-container fluid>
                <v-row>
                    <v-col cols="12">
                        <v-card 
                            class="grey lighten-5"                            
                            outlined>
                            <v-card-text>
                                <v-row
                                    justify="center"
                                    alignment="center">
                                    {{nama_soal}}
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col xs="12" sm="6" md="3" v-for="(item,index) in daftar_jawaban" v-bind:key="item.id">                                    
                        <JawabanSoal :index="index" :item="item" v-on:selesaiJawab="selesaiJawab" />
                    </v-col> 
                    <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>   
                </v-row>
            </v-container>
        </v-main>
    </div>
</template>
<script>
import JawabanSoal from '@/components/JawabanSoal';
export default {
    name:'UjianOnline',
    created () {           
        this.initialize()
    },  
    data: () => ({
        nama_soal:'',
        daftar_jawaban:[]
    }),
    methods: {
        initialize:async function () 
        {
            await this.$ajax.get('/spmb/ujianonline/'+this.$store.getters['auth/AttributeUser']('id'),           
            {
                headers: {
                    Authorization:this.$store.getters['auth/Token']
                }
            }).then(({data})=>{       
                if (data.status==0)
                {
                    this.nama_soal='UJIAN SELESAI';
                    this.daftar_jawaban=[];
                }
                else
                {
                    this.nama_soal = data.soal.soal;                 
                    this.daftar_jawaban = data.jawaban;
                }
            }).catch(()=>{
                
            }); 
        },
        selesaiJawab ()
        {
            console.log('test');
            this.initialize();
        }
    },    
    components:{
        JawabanSoal,        
    },
}
</script>