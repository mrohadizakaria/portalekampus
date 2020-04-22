<template>
    <FrontLayout>
        <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
                <v-col xs="12" sm="6" md="4">
                    <h1 class="text-center display-1 font-weight-black primary--text">LOGIN</h1>
                </v-col>
            </v-row>
            <v-row align="center" justify="center" no-gutters>
                <v-col xs="12" sm="6" md="4">
                    <v-text-field label="Username" outlined dense />                    
                </v-col>
            </v-row>
            <v-row align="center" justify="center" no-gutters>
                <v-col xs="12" sm="6" md="4">
                    <v-text-field 
                        label="Password" 
                        type="password"                         
                        outlined 
                        dense />                    
                </v-col>
            </v-row>
            <v-row align="center" justify="center" no-gutters>
                <v-col xs="12" sm="6" md="4">                                        
                    <v-btn 
                        color="primary" 
                        @click="doLogin" 
                        :loading="btnLoading"
                        :disabled="btnLoading"
                        block>
                            Login
                    </v-btn>	                
                </v-col>
            </v-row>
        </v-container>
    </FrontLayout>
</template>
<script>
import FrontLayout from '@/views/layouts/FrontLayout';
export default {
    name: 'Login',
    data ()
    {
        return {
            btnLoading:false
        }
    },
    methods: {
        doLogin: async function ()
        {
            this.btnLoading=true;

            this.btnLoading=false;
        }
    },
    components: {
		FrontLayout
	}  
}
</script>