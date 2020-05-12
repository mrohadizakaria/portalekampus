<template>
     <v-row class="mb-4" no-gutters>
        <v-col cols="12">
            <v-form ref="frmdata" v-model="form_valid" lazy-validation>
                <v-card class="mb-4">
                    <v-card-title>
                        IDENTITAS DIRI
                    </v-card-title>
                    <v-card-text>
                        <v-text-field
                            label="NAMA LENGKAP"                            
                            filled
                        />
                        <v-text-field
                            label="TEMPAT LAHIR"
                            filled
                        />
                        <v-text-field
                            label="TANGGAL LAHIR"
                            filled
                        />
                        <v-text-field
                            label="JENIS KELAMIN"
                            filled
                        />
                        <v-text-field
                            label="NOMOR HP"
                            filled
                        />
                        <v-text-field
                            label="EMAIL"
                            filled
                        />

                    </v-card-text>
                </v-card>
                <v-card class="mb-4">
                    <v-card-title>
                        ALAMAT
                    </v-card-title>
                    <v-card-text>
                        <v-select
                            label="PROVINSI"
                            :items="daftar_provinsi"
                            v-model="provinsi_id"
                            item-text="nama"
                            item-value="id"
                            filled
                        />
                        <v-select
                            label="KABUPATEN/KOTA"
                            :items="daftar_kabupaten"
                            v-model="kabupaten_id"
                            item-text="nama"
                            item-value="id"
                            filled
                        />
                        <v-select
                            label="KECAMATAN"
                            :items="daftar_kecamatan"
                            v-model="kecamatan_id"
                            item-text="nama"
                            item-value="id"
                            filled
                        />
                        <v-text-field
                            label="ALAMAT RUMAH"
                            filled
                        />
                    </v-card-text>
                </v-card>
                <v-card class="mb-4">
                    <v-card-title>
                        PILIHAN PROGRAM STUDI
                    </v-card-title>
                    <v-card-text>
                        <v-select
                            label="FAKULTAS"
                            filled
                        />
                        <v-select
                            label="PROGRAM STUDI"
                            filled
                        />
                    </v-card-text>
                </v-card>
                <v-card class="mb-4">                    
                    <v-card-actions>
                        
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name:'FormMahasiswaBaru',
    created()
    {
        this.initialize();
    },
    data:()=>({
        //form
        form_valid:true,
        daftar_provinsi:[],
        provinsi_id:0,

        daftar_kabupaten:[],
        kabupaten_id:0,

        daftar_kecamatan:[],
        kecamatan_id:0,

        frmdata:{
            
        }

    }),
    methods: {
        initialize:async function ()
        {
            this.$ajax.get('/dmaster/provinsi').then(({data})=>{                
                this.daftar_provinsi=data.provinsi;
            });
        },        
    },
    watch:{
        provinsi_id(val)
        {
            this.$ajax.get('/dmaster/provinsi/'+val+'/kabupaten').then(({data})=>{                
                this.daftar_kabupaten=data.kabupaten;
            });
            this.daftar_kecamatan=[];
        },
        kabupaten_id(val)
        {
            this.$ajax.get('/dmaster/kabupaten/'+val+'/kecamatan').then(({data})=>{                                
                this.daftar_kecamatan=data.kecamatan;
            });
        },
    }
}
</script>