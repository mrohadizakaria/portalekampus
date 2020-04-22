<template>
	<v-app>
		<router-view/>		
		<v-snackbar v-model="snackbar_success" :color="snackbar_color" :top="true">
			{{ page_message }}<br>			
		</v-snackbar>
		<v-snackbar v-model="snackbar_error" :color="snackbar_color" :top="true">
			{{ page_message }}<br>
			<div v-for="err in page_form_error_message" v-bind:key="err.name">
				<strong>{{err.field}}</strong>
				<div v-for="error in err.error" v-bind:key="error.message">
					{{error.message}}
				</div>
			</div>
		</v-snackbar>
		<confirm ref="confirm"></confirm>
	</v-app>
</template>
<script>
import confirm from "./components/Confirm"
export default {	
	name: 'PortalEkampus',
	data ()
	{
		return {
			snackbar_success:false,
			snackbar_error:false,
			snackbar_color:'error',
			page_message:'',
			page_form_error_message:{}
		}
	},
	mounted()
	{
		this.$root.$confirm = this.$refs.confirm;
	},
	components:{
		confirm
	}
};
</script>