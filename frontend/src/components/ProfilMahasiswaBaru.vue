<template>
    <v-card>
        <v-card-title>
            <span class="headline">PROFIL MAHASISWA BARU</span>
        </v-card-title>
        <v-card-text>
            <v-row no-gutters>
                <v-col xs="12" sm="6" md="2">
                    <v-card flat>
                        <v-card-text>
                            <v-img :src="$api.url+'/'+item.foto" />
                        </v-card-text>
                    </v-card>
                    <v-card flat>
                        <v-card-title>NOMOR HP:</v-card-title>  
                        <v-card-subtitle>
                            {{datamhs.nomor_hp}}
                        </v-card-subtitle>
                    </v-card>
                    <v-card flat>
                        <v-card-title>EMAIL:</v-card-title>  
                        <v-card-subtitle>
                            {{datamhs.email}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                <v-col xs="12" sm="6" md="10">
                    <v-row no-gutters>
                        <v-col xs="12" sm="6" md="6">
                            <v-card flat>
                                <v-card-title>ID :</v-card-title>
                                <v-card-subtitle>
                                    {{datamhs.id}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                        <v-col xs="12" sm="6" md="6">
                            <v-card flat>
                                <v-card-title>PROGRAM STUDI :</v-card-title>
                                <v-card-subtitle>
                                    {{datamhs.kjur1}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                    </v-row>
                    <v-row no-gutters>                
                        <v-col xs="12" sm="6" md="6">
                            <v-card flat>
                                <v-card-title>NAMA MAHASISWA :</v-card-title>
                                <v-card-subtitle>
                                    {{datamhs.nama_mhs}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                        <v-col xs="12" sm="6" md="6">
                            <v-card flat>
                                <v-card-title>KELAS :</v-card-title>
                                <v-card-subtitle>
                                    {{datamhs.nama_kelas}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                    </v-row>
                    <v-row no-gutters>                
                        <v-col xs="12" sm="6" md="6">
                            <v-card flat>
                                <v-card-title>TEMPAT DAN TGL. LAHIR :</v-card-title>
                                <v-card-subtitle>
                                    {{datamhs.tempat_lahir}}, {{datamhs.tanggal_lahir|formatTanggal('DD/MM/YYYY')}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                        <v-col xs="12" sm="6" md="6">
                            <v-card flat>
                                <v-card-title>WAKTU MENDAFTAR :</v-card-title>
                                <v-card-subtitle>
                                    {{item.created_at|formatTanggal}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                    </v-row>
                    <v-row no-gutters>               
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                        <v-col xs="12" sm="6" md="6">
                            <v-card flat>
                                <v-card-title>ALAMAT RUMAH :</v-card-title>
                                <v-card-subtitle>
                                    {{datamhs.alamat_rumah}}, KEL. {{datamhs.address1_kelurahan}}, KEC. {{datamhs.address1_kecamatan}}, KOTA/KAB. {{datamhs.address1_kabupaten}}, PROV. {{datamhs.address1_provinsi}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                        <v-col xs="12" sm="6" md="6">
                            <v-card flat>
                                <v-card-title>WAKTU MENDAFTAR :</v-card-title>
                                <v-card-subtitle>
                                    {{item.created_at|formatTanggal}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    name:'ProfilMahasiswaBaru',
    created()
    {
        this.initialize();                        
    },
    props:{
        item:Object,
    },
    data:()=>({
        datamhs:{        
            tanggal_lahir:'2020-09-12 10:00:00',
            created_at:'2020-09-12 10:00:00',
            updated_at:'2020-09-12 10:00:00'
        },        
    }),
     methods: {
        initialize ()
        {
            this.$ajax.get('/spmb/formulirpendaftaran/'+this.item.id,             
                {
                    headers:{
                        Authorization:this.$store.getters['auth/Token']
                    }
                },                
            ).then(({data})=>{   
                this.datamhs=Object.assign(data.formulir,{nama_kelas:this.$store.getters['uiadmin/getNamaKelas'](data.formulir.idkelas)});                           
                console.log(this.datamhs);  
            });
        }
     }

}
</script>