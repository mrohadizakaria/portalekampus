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
                :close-on-content-click="true"
                origin="center center"
                transition="scale-transition"
                :offset-y="true"
                bottom 
                left>
                <template v-slot:activator="{on}">
                    <v-avatar>
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
                                {{ATTRIBUTE_USER('role').toString()}}
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
						{{ATTRIBUTE_USER('role').toString()}}
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
                <v-list-group group="/setting" prepend-icon="mdi-cog-outline" no-action v-if="CAN_ACCESS('SETTING-SUBMENU')">
                    <template v-slot:activator>
                        <v-list-item-content>								
                            <v-list-item-title>SETTING</v-list-item-title>
                        </v-list-item-content>							
                    </template>   
                    <div>                 						
                        <v-list-item link v-if="CAN_ACCESS('SETTING-PERMISSIONS')" to="/setting/permissions" class="ml-5">
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-circle-double</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    PERMISSIONS
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>                    
                        <v-list-item link v-if="CAN_ACCESS('SETTING-ROLES')" to="/setting/roles" class="ml-5">
                            <v-list-item-icon class="mr-2">
                                <v-icon>mdi-circle-double</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>
                                    ROLES
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
			<v-list-item>
				
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
        
    },
    data ()
    {
        return {
            loginTime:0,
            drawer:null,
			drawerRight:null,
        }
    },
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
                this.$router.push('/');
            })
            .catch(() => {
                this.$store.dispatch('auth/logout');	
                this.$router.push('/');
            });
        }
	},
    computed:{
        ...mapGetters('auth',{
            AUTHENTICATED:'Authenticated',  
            ACCESS_TOKEN:'AccessToken',          
            TOKEN:'Token',          
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
        }
    }
}
</script>