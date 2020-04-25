<template>
    <AdminLayout>
		<ModuleHeader/>		
    </AdminLayout>
</template>
<script>
import AdminLayout from '@/views/layouts/AdminLayout';
import ModuleHeader from '@/components/ModuleHeader';
export default {
    name: 'Dashboard',
    created ()
	{
		this.initialize();
	},
	data ()
	{
		return {
			
		}
	},
	methods : {
		initialize()
		{
			
		}
	},
	computed:{
        
	},
    components:{
		AdminLayout,
		ModuleHeader,
	}
}
</script>