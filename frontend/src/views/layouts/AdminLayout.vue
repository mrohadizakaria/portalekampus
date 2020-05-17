<template>
    <div>
        <v-system-bar app dark color="primary white--text">
            
		</v-system-bar>	
        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
            <v-toolbar-title class="headline">
				<span class="hidden-sm-and-down">{{APP_NAME}}</span>
			</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu 
                :close-on-content-click="false"
                origin="center center"
                transition="scale-transition"
                :offset-y="true"
                bottom 
                left
                v-if="CAN_ACCESS('SYSTEM-SETTING-GROUP')">
                <template v-slot:activator="{on}">
                    <v-btn v-on="on" icon>
                        <v-icon>mdi-cog-outline</v-icon>
                    </v-btn>
                </template>
                <v-list dense>
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-icon>mdi-cog-outline</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="title">
                                KONFIGURASI SISTEM
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                &nbsp;
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider/>
                    <v-list-item class="teal lighten-5">
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>								
                            <v-list-item-title>PERGURUAN TINGGI</v-list-item-title>
                        </v-list-item-content>		
                    </v-list-item>
                    <v-list-item link v-if="CAN_ACCESS('SYSTEM-SETTING-IDENTITAS-DIRI')" to="/system-setting/identitasdiri">
                        <v-list-item-icon>
                            <v-icon>mdi-circle-double</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                IDENTITAS DIRI
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>                    
                    <v-list-item class="teal lighten-5">
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>								
                            <v-list-item-title>USER</v-list-item-title>
                        </v-list-item-content>		
                    </v-list-item>
                    <v-list-item link v-if="CAN_ACCESS('SYSTEM-SETTING-PERMISSIONS')" to="/system-setting/permissions">
                        <v-list-item-icon>
                            <v-icon>mdi-circle-double</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                PERMISSIONS
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>                    
                    <v-list-item link v-if="CAN_ACCESS('SYSTEM-SETTING-ROLES')" to="/system-setting/roles">
                        <v-list-item-icon>
                            <v-icon>mdi-circle-double</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                ROLES
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>          
                    <v-list-item class="teal lighten-5">
                        <v-list-item-icon>
                            <v-icon>mdi-server-network</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>								
                            <v-list-item-title>SERVER</v-list-item-title>
                        </v-list-item-content>		
                    </v-list-item>
                    <v-list-item link v-if="CAN_ACCESS('SYSTEM-SETTING-VARIABLES')" to="/system-setting/captcha">
                        <v-list-item-icon>
                            <v-icon>mdi-circle-double</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>
                                CAPTCHA
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>  
                </v-list>
            </v-menu>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-menu 
                :close-on-content-click="true"
                origin="center center"
                transition="scale-transition"
                :offset-y="true"
                bottom 
                left>
                <template v-slot:activator="{on}">
                    <v-avatar size="30">
                        <v-img :src="photoUser" v-on="on" />
                    </v-avatar>                    
                </template>
                <v-list>
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-img :src="photoUser"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>					
                            <v-list-item-title class="title">
                                {{ATTRIBUTE_USER('username')}}
                            </v-list-item-title>
                            <v-list-item-subtitle>                                
                                {{ROLE}}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>                    
                    <v-divider/>
                    <v-list-item @click.prevent="logout">
                        <v-list-item-icon>
							<v-icon>mdi-power</v-icon>
						</v-list-item-icon>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
			<v-app-bar-nav-icon @click.stop="drawerRight = !drawerRight">
                <v-icon>mdi-filter</v-icon>
			</v-app-bar-nav-icon>            
        </v-app-bar>    
        <v-navigation-drawer v-model="drawer" width="300" :temporary="isReportPage" app>
			<v-list-item>
				<v-list-item-avatar>
					<v-img :src="photoUser" @click.stop="toProfile"></v-img>
				</v-list-item-avatar>
				<v-list-item-content>					
					<v-list-item-title class="title">
						{{ATTRIBUTE_USER('username')}}
					</v-list-item-title>
					<v-list-item-subtitle>
						{{ROLE}}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider></v-divider>
            <v-list expand>
                <v-list-item :to="{path:'/dashboard/'+ACCESS_TOKEN}" link>
                    <v-list-item-icon>
                        <v-icon>mdi-monitor-dashboard</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>DASHBOARD</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-group group="/dmaster" prepend-icon="mdi-home-floor-b" no-action v-if="CAN_ACCESS('DMASTER-GROUP')">
                    <template v-slot:activator>
                        <v-list-item-content>								
                            <v-list-item-title>DATA MASTER</v-list-item-title>
                        </v-list-item-content>							
                    </template>   
                    <div>              
                        <v-list-item link v-if="CAN_ACCESS('DMASTER-FAKULTAS_BROWSE') && isBentukPT('universitas')" to="/dmaster/fakultas" class="ml-5">
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-circle-double</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    FAKULTAS
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>           
                        <v-list-item link v-if="CAN_ACCESS('DMASTER-PRODI_BROWSE')" to="/dmaster/programstudi" class="ml-5">
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-circle-double</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    PROGRAM STUDI
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>           
                        <v-list-item link v-if="CAN_ACCESS('DMASTER-KELAS_BROWSE')" to="/dmaster/kelas" class="ml-5">
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-circle-double</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    KELAS
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>           
                    </div>
                </v-list-group>
                <v-list-group group="/spmb" prepend-icon="mdi-account-plus" no-action v-if="CAN_ACCESS('SPMB-GROUP')">
                    <template v-slot:activator>
                        <v-list-item-content>								
                            <v-list-item-title>SPMB</v-list-item-title>
                        </v-list-item-content>							
                    </template>   
                    <div>              
                        <v-list-item link v-if="CAN_ACCESS('SPMB-PMB_BROWSE')" to="/spmb/pendaftaranbaru" class="ml-5">
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-circle-double</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    PENDAFTARAN BARU
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>                    
                        <v-list-item link v-if="CAN_ACCESS('SPMB-PMB-FORMULIR-PENDAFTARAN_BROWSE')" to="/spmb/formulirpendaftaran" class="ml-5">
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-circle-double</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    FORMULIR PENDAFTARAN
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>                    
                        <v-list-item link v-if="CAN_ACCESS('SPMB-PMB_BROWSE')" to="/spmb/konfirmasipembayaran" class="ml-5">
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-circle-double</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    KONFIRM. PEMBAYARAN
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>                    
                    </div>
                </v-list-group>
                <v-list-group group="/system-users" prepend-icon="mdi-account" no-action v-if="CAN_ACCESS('SYSTEM-USERS-GROUP')">
                    <template v-slot:activator>
                        <v-list-item-content>								
                            <v-list-item-title>USER SISTEM</v-list-item-title>
                        </v-list-item-content>							
                    </template>   
                    <div>                 						
                        <!-- <v-list-item link v-if="CAN_ACCESS('SYSTEM-USERS-SUPERADMIN')" to="/system-users/superadmin" class="ml-5">
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-circle-double</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    SUPERADMIN
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>                    
                        <v-list-item link v-if="CAN_ACCESS('SYSTEM-USERS-AKADEMIK')" to="/system-users/akademik" class="ml-5">
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-circle-double</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    AKADEMIK
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>                     -->
                        <v-list-item link v-if="CAN_ACCESS('SYSTEM-USERS-PMB')" to="/system-users/pmb" class="ml-5">
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-circle-double</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    TIM PMB
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>                    
                    </div>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>
        <v-navigation-drawer v-model="drawerRight" width="300" app fixed right temporary>
			<v-list-item>		
				<v-list-item-icon>
					<v-icon>mdi-bookmark</v-icon>
				</v-list-item-icon>			
				<v-list-item-content>									
					<v-list-item-title class="title">
						FILTER
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-divider></v-divider>
			<v-list-item v-if="filterTahunMasuk">
				<v-list-item-content>
                    <v-select
                        v-model="tahun_masuk"
                        :items="daftar_ta"
                        item-text="tahun_akademik"
                        item-value="tahun"
                        label="TAHUN PENDAFTARAN"
                        outlined
                    ></v-select>	
				</v-list-item-content>
			</v-list-item>			
		</v-navigation-drawer>
        <v-content class="mx-4 mb-4">			
			<slot />
		</v-content>
    </div>    
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    name:'AdminLayout',
    created()
    {     
        switch(this.$route.name)
        {
            case 'SPMBPendaftaranBaru' :                                    
            case 'SPMBKonfirmasiPembayaran' :
                this.daftar_ta=this.$store.getters['uiadmin/getDaftarTA'];  
                this.tahun_masuk=this.$store.getters['uiadmin/getTahunMasuk'];       
            break;
        }            
    }, 
    data:()=>({
        loginTime:0,
        drawer:null,
        drawerRight:null,
        
        //filter
        daftar_ta:[],
        tahun_masuk:2020
    }),       
    methods: {
        logout ()
        {
            this.loginTime=0;
            this.$ajax.post('/auth/logout',
                {},
                {
                    headers:{
                        'Authorization': this.TOKEN,
                    }
                }
            ).then(()=> {     
                this.$store.dispatch('auth/logout');	
                this.$store.dispatch('uifront/reinit');	
                this.$store.dispatch('uiadmin/reinit');	
                this.$router.push('/');
            })
            .catch(() => {
                this.$store.dispatch('auth/logout');	
                this.$store.dispatch('uifront/reinit');	
                this.$store.dispatch('uiadmin/reinit');	
                this.$router.push('/');
            });
        },
        isBentukPT (bentuk_pt)
        {
            return this.$store.getters['uifront/getBentukPT']==bentuk_pt?true:false;
        }
	},
    computed:{
        ...mapGetters('auth',{
            AUTHENTICATED:'Authenticated',  
            ACCESS_TOKEN:'AccessToken',          
            TOKEN:'Token',          
            ROLE:'Role',
            CAN_ACCESS:'can',         
            ATTRIBUTE_USER:'AtributeUser',               
        }),
        APP_NAME ()
        {
            return process.env.VUE_APP_NAME;
        },
        photoUser()
		{
			let img=this.ATTRIBUTE_USER('foto');
			var photo;
			if (img == '')
			{
				photo = this.$api.url+'/storage/images/users/no_photo.png';	
			}
			else
			{
				photo = this.$api.url+'/'+img;	
			}
			return photo;
        },
        isReportPage ()
		{
			if (this.$route.name=='ReportFormBMurni')
			{
				return true;
			}
			else
			{
				return false
			}
        },
        filterTahunMasuk()
        {
            var bool=false;
            switch(this.$route.name)
            {
                case 'SPMBPendaftaranBaru' :
                case 'SPMBKonfirmasiPembayaran' :
                    bool = true;                       
                break;
            }   
            return bool;         
        },        
    },
    watch: {
        loginTime:{
            handler(value)
            {
                
                if (value >= 0)
                {
                    setTimeout(() => { 
                        this.loginTime=this.AUTHENTICATED==true?this.loginTime+1:-1;                                                                     
					}, 1000);
                }
                else
                {
                    this.$store.dispatch('auth/logout');
                    this.$router.replace('/login');
                }
            },
            immediate:true
        },
        tahun_masuk(val)
        {
            this.$store.dispatch('uiadmin/updateTahunMasuk',val);
        }
    }
}
</script>