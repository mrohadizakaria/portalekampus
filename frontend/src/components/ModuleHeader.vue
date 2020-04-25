<template>
    <v-container :fluid="isReportPage">
        <v-row no-gutters>
            <v-col>
                <h1 class="subheading grey--text">
                    <v-icon>
                        
                    </v-icon>                    
                </h1>
            </v-col>
            <v-col>
                <slot />
            </v-col>
        </v-row>        
    </v-container>
</template>
<script>
export default {
    name:'ModuleHeader',
    computed : {        
        isReportPage ()
		{
			return true;
		},
    }
}
</script>