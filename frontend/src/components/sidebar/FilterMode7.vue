<template>
    <v-list-item>
        <v-list-item-content>
            <v-select
                v-model="prodi_id"
                :items="daftar_prodi"                
                item-text="text"
                item-value="id"
                label="PROGRAM STUDI"
                outlined/>            
            <v-select
                v-model="tahun_masuk"
                :items="daftar_ta"
                item-text="tahun_akademik"
                item-value="tahun"
                label="TAHUN PENDAFTARAN"
                outlined/>            
        </v-list-item-content>
    </v-list-item>	
</template>
<script>
export default {
    name:'FilterMode7',
    created()
    {
        this.daftar_prodi=this.$store.getters['uiadmin/getDaftarProdi'];  
        this.prodi_id=this.$store.getters['uiadmin/getProdiID'];                                    

        this.daftar_ta=this.$store.getters['uiadmin/getDaftarTA'];  
        this.tahun_masuk=this.$store.getters['uiadmin/getTahunMasuk'];  
        
        this.firstloading=false;
    },
    data:()=>({
        firstloading:true,
        daftar_prodi:[],
        prodi_id:null,

        daftar_ta:[],
        tahun_masuk:null
    }),
    watch:{
        tahun_masuk(val)
        {
            if (!this.firstloading)
            {
                this.$store.dispatch('uiadmin/updateTahunMasuk',val);  
                this.$emit('changeTahunMasuk',val);          
            }            
        },
        prodi_id(val)
        {
            if (!this.firstloading)
            {
                this.$store.dispatch('uiadmin/updateProdi',val);  
                this.$emit('changeProdi',val);          
            }
        },
    }
}
</script>