<template>
    <v-card>
        <v-card-title class="headline">
            TOTAL MAHASISWA BARU : {{total_mb}}
        </v-card-title>
        <v-card-text>
            <v-row dense>                
                <v-col xs="12" sm="6" md="3" v-for="item in daftar_prodi" v-bind:key="item.id">
                    <v-card color="#385F73" dark>
                        <v-card-title class="headline">
                            {{item.nama_prodi}}
                        </v-card-title>
                        <v-card-subtitle class="headline">
                            Jenjang : {{item.nama_jenjang}}
                        </v-card-subtitle>
                        <v-card-text>
                            {{item.jumlah}}
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>            
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    name: 'DashboardPMB',
    mounted()
    {
        this.initialize();
    },
    props:{
        tahun_pendaftaran:{
            type:Number,
            required:true
        }
    },
    data:()=>({
        datatableLoading:false,
        //statistik
        daftar_prodi:[],
        total_mb:0,
    }),
    methods: {
        initialize:async function ()
        {
            this.datatableLoading=true;            
            await this.$ajax.post('/dashboard/pmb',
            {
                TA:this.tahun_pendaftaran,                
            },
            {
                headers: {
                    Authorization:this.$store.getters['auth/Token']
                }
            }).then(({data})=>{               
                this.daftar_prodi = data.daftar_prodi;
                this.total_mb = data.total_mb;
                this.datatableLoading=false;
            }).catch(()=>{
                this.datatableLoading=false;
            });
        }
    }
}
</script>