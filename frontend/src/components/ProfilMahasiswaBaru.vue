<template>
    <v-card>
        <v-card-title>
            <span class="headline">PROFIL MAHASISWA BARU</span>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-icon                
                @click.stop="closeDialog()">
                mdi-close-thick
            </v-icon>
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
                        <v-col xs="12" sm="6" md="7">
                            <v-card flat>
                                <v-card-title>ID :</v-card-title>
                                <v-card-subtitle>
                                    {{datamhs.id}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                        <v-col xs="12" sm="6" md="5">
                            <v-card flat>
                                <v-card-title>PROGRAM STUDI :</v-card-title>
                                <v-card-subtitle>
                                    {{datamhs.nama_prodi}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                    </v-row>
                    <v-row no-gutters>                
                        <v-col xs="12" sm="6" md="7">
                            <v-card flat>
                                <v-card-title>NAMA MAHASISWA :</v-card-title>
                                <v-card-subtitle>
                                    {{datamhs.nama_mhs}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                        <v-col xs="12" sm="6" md="5">
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
                        <v-col xs="12" sm="6" md="7">
                            <v-card flat>
                                <v-card-title>TEMPAT DAN TGL. LAHIR :</v-card-title>
                                <v-card-subtitle>
                                    {{datamhs.tempat_lahir}}, {{datamhs.tanggal_lahir|formatTanggal('DD/MM/YYYY')}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                        <v-col xs="12" sm="6" md="5">
                            <v-card flat>
                                <v-card-title>TAHUN PENDAFTARAN :</v-card-title>
                                <v-card-subtitle>
                                    {{datamhs.ta}}, ({{item.created_at|formatTanggal}})
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                    </v-row>
                    <v-row no-gutters>               
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                        <v-col xs="12" sm="6" md="7">
                            <v-card flat>
                                <v-card-title>ALAMAT RUMAH :</v-card-title>
                                <v-card-subtitle>
                                    {{datamhs.alamat_rumah}}, KEL. {{datamhs.address1_kelurahan}}, KEC. {{datamhs.address1_kecamatan}}, KOTA/KAB. {{datamhs.address1_kabupaten}}, PROV. {{datamhs.address1_provinsi}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                        <v-col xs="12" sm="6" md="5">
                            <v-card flat>
                                <v-card-title>TGL. UBAH :</v-card-title>
                                <v-card-subtitle>
                                    {{item.created_at|formatTanggal}}
                                </v-card-subtitle>
                            </v-card>
                        </v-col>
                        <v-responsive width="100%" v-if="$vuetify.breakpoint.xsOnly"/>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col xs="12" sm="12" md="12">
                    <v-card>
                        <v-card-title>
                            <span class="headline">PERSYARATAN PENDAFTARAN</span>
                        </v-card-title>
                        <v-card-text>
                            <FormPersyaratan :user_id="item.id"/>
                        </v-card-text>
                    </v-card>     
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
import FormPersyaratan from '@/components/FormPersyaratanPMB';
export default {
    name:'ProfilMahasiswaBaru',
    created()
    {
        this.initialize();                     
    },
    props:{
        item:Object,
    },
    data()
    {
        let tanggal_sekarang=this.getCurrentDate();
        return {        
            datamhs:{                    
                tanggal_lahir:tanggal_sekarang,
                created_at:tanggal_sekarang,
                updated_at:tanggal_sekarang
            },        
        }
    },
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
                this.datamhs=Object.assign(data.formulir,{
                                                            nama_prodi:this.$store.getters['uiadmin/getProdiName'](data.formulir.kjur1),
                                                            nama_kelas:this.$store.getters['uiadmin/getNamaKelas'](data.formulir.idkelas)
                                                        }); 
            });
        },
        closeDialog() 
        {
            setTimeout(() => {
                this.$emit('closeProfilMahasiswaBaru');                
                }, 300
            );            
        }
    },
    components:{        
        FormPersyaratan,        
    },
}
</script>