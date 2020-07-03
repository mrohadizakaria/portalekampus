<template>
    <v-row no-gutters>
        <v-col cols="12">
            <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
                <!-- <v-timeline-item color="deep-orange lighten-2" icon="mdi-email-alert" fill-dot>
                    <v-card color="deep-orange lighten-2" dark>
                        <v-card-title class="title">Verifikasi Email</v-card-title>
                        <v-card-text class="white text--primary">
                            <p>Email belum diverifikasi, silahkan diverifikasi !!!.</p>
                            <v-btn
                                color="deep-orange lighten-2"
                                class="mx-0"
                                outlined
                            >
                                Kirim Ulang
                            </v-btn>
                        </v-card-text>                    
                    </v-card>
                </v-timeline-item> -->
                <v-timeline-item color="purple darken-1" icon="mdi-book-variant" fill-dot>
                    <v-card color="purple darken-1" dark>
                        <v-card-title class="title">Formulir Pendaftaran</v-card-title>
                        <v-card-text class="white text--primary">
                            <p>
                                Isi formulir pendaftaran dan lengkapi persyaratannya yaitu:
                                <ul>
                                    <li>Scan Pas Foto</li>
                                    <li>Scan Ijazah Terakhir</li>
                                    <li>Scan KTP</li>
                                    <li>Scan Kartu Keluarga</li>
                                </ul>
                            </p>                            
                            <v-btn
                                color="purple darken-1"
                                class="mx-0 mr-2"
                                outlined
                                to="/spmb/formulirpendaftaran"
                            >
                                Isi Formulir
                            </v-btn>
                            <v-btn
                                color="purple darken-1"
                                class="mx-0"
                                outlined
                                to="/spmb/persyaratan"
                            >
                                Upload Persyaratan
                            </v-btn>
                        </v-card-text>                    
                    </v-card>
                </v-timeline-item>
                <!-- <v-timeline-item color="red lighten-2" icon="mdi-account-cash" fill-dot>
                    <v-card color="red lighten-2" dark>
                        <v-card-title class="title">Konfirmasi Pembayaran</v-card-title>
                        <v-card-text class="white text--primary">
                            <p>Konfirmasi Pembayaran uang pembayaran</p>
                            <v-btn
                                color="red lighten-2"
                                class="mx-0"
                                outlined
                            >
                                Button
                            </v-btn>
                        </v-card-text>                    
                    </v-card>
                </v-timeline-item>           -->      
                <v-timeline-item color="indigo" icon="mdi-head-question-outline" fill-dot>
                    <v-card color="indigo" dark>
                        <v-card-title class="title">Ujian Online</v-card-title>
                        <v-card-text class="white text--primary">
                            <p>Ujian Online dilaksanakan selama 60 Menit dimulai saat menekan tombol Mulai</p>
                            <v-btn
                                color="indigo"
                                class="mx-0 mr-2"
                                @click.stop="mulaiUjian"
                                outlined>
                                Pilih Jadwal Ujian
                            </v-btn>
                            <v-btn
                                color="indigo"
                                class="mx-0"
                                @click.stop="mulaiUjian"
                                outlined>
                                Mulai
                            </v-btn>
                        </v-card-text>                    
                    </v-card>
                </v-timeline-item>
                <!-- <v-timeline-item color="green lighten-1" icon="mdi-airballoon" fill-dot>
                    <v-card color="green lighten-1" dark>
                        <v-card-title class="title">Hasil Ujian</v-card-title>
                        <v-card-text class="white text--primary">
                            <p>Hasil Ujian</p>
                            <v-btn
                                color="green lighten-1"
                                class="mx-0"
                                outlined
                            >
                                Button
                            </v-btn>
                        </v-card-text>                    
                    </v-card>
                </v-timeline-item> -->
            </v-timeline>
        </v-col>
    </v-row>
</template>
<script>
export default {
    name: 'DashboardMahasiswaBaru',
    created()
    {
        this.initialize();
    },
    data:()=>({

    }),
    methods: {
        initialize:async function ()
        {
            
        },
        mulaiUjian()
        {
            this.$router.push('/spmb/ujianonline');
        }
    }
}
</script>