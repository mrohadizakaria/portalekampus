<template>
    <v-container :fluid="isReportPage">        
        <v-row no-gutters>
            <v-col xs="12" sm="12" md="12">
                <slot name="breadcrumbs"/>
            </v-col>
        </v-row>
        <v-row no-gutters>            
            <v-col xs="12" sm="12" md="12">
                <h1 class="subheading grey--text">
                    <v-icon large>
                        <slot name="icon" />
                    </v-icon>
                    <slot name="name" />
                </h1>                
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col xs="12" sm="12" md="12">
                <slot name="desc" />
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