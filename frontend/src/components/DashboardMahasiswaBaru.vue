<template>
    <v-row no-gutters>
        <v-col cols="12">
            <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
                <v-timeline-item color="purple darken-1" icon="mdi-book-variant" fill-dot>
                    <v-card color="purple darken-1" dark>
                        <v-card-title class="title">Formulir Pendaftaran</v-card-title>
                        <v-card-text class="white text--primary">
                            <p>Melengkapi formulir pendaftaran</p>
                            <v-btn
                                color="purple darken-1"
                                class="mx-0"
                                outlined
                            >
                                Button
                            </v-btn>
                        </v-card-text>                    
                    </v-card>
                </v-timeline-item>
                <v-timeline-item color="red lighten-2" icon="mdi-account-cash" fill-dot>
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
                </v-timeline-item>                
                <v-timeline-item color="indigo" icon="mdi-buffer" fill-dot>
                    <v-card color="indigo" dark>
                        <v-card-title class="title">Ujian Online</v-card-title>
                        <v-card-text class="white text--primary">
                            <p>Ujian Online</p>
                            <v-btn
                                color="indigo"
                                class="mx-0"
                                outlined
                            >
                                Button
                            </v-btn>
                        </v-card-text>                    
                    </v-card>
                </v-timeline-item>
                <v-timeline-item color="green lighten-1" icon="mdi-airballoon" fill-dot>
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
                </v-timeline-item>
            </v-timeline>
        </v-col>
    </v-row>
</template>
<script>
export default {
    
}
</script>