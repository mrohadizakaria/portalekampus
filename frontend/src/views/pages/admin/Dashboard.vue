<template>
    <AdminLayout>
		<ModuleHeader>
            <template v-slot:icon>
                mdi-monitor-dashboard
            </template>
            <template v-slot:name>
                DASHBOARD
            </template>
            <template v-slot:breadcrumbs>
                <v-breadcrumbs :items="breadcrumbs" class="pa-0">
                    <template v-slot:divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>
            </template>
            <template v-slot:desc>
                <v-alert                                        
                    color="cyan"
                    border="left"                    
                    colored-border
                    type="info"
                    >
                    dashboard untuk memperoleh ringkasan informasi.
                    </v-alert>
            </template>
        </ModuleHeader>   	
        <v-container v-if="dashboard=='mahasiswabaru'">
            <DashboardMB />
        </v-container>
        <v-container v-else>
            
        </v-container>

    </AdminLayout>
</template>
<script>
import DashboardMB from '@/components/DashboardMahasiswaBaru';
import AdminLayout from '@/views/layouts/AdminLayout';
import ModuleHeader from '@/components/ModuleHeader';
export default {
    name: 'Dashboard',
    created ()
	{
        this.TOKEN = this.$route.params.token;        
		this.breadcrumbs = [
			{
				text:'HOME',
				disabled:false,
				href:'/dashboard/'+this.TOKEN
			},
			{
				text:'DASHBOARD',
				disabled:true,
				href:'#'
			}
		];		
		this.initialize();
	},
	data: () => ({
        breadcrumbs:[],
        TOKEN:null,
        dashboard:null,
	}),
	methods : {
		initialize:async function()
		{	
            let dashboard = this.$store.getters['uiadmin/getDefaultDashboard'];                        
            if (dashboard == null)
            {                
                await this.$ajax.get('/auth/me',                
                {
                    headers: {
                        Authorization:'Bearer '+this.TOKEN
                    }
                }).then(({data})=>{               
                    this.dashboard = data.role[0];    
                    this.$store.dispatch('uiadmin/changeDashboard',this.dashboard);                                       
                });                 
                this.$store.dispatch('uiadmin/init',this.$ajax);    
            }                       
            else
            {
                this.dashboard=dashboard;
            }             
		}
	},
	computed:{
        
	},
    components:{
		AdminLayout,
        ModuleHeader,
        DashboardMB
	}
}
</script>