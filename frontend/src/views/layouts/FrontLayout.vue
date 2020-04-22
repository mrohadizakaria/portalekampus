<template>
    <div>
        <v-app-bar app>
            <v-toolbar-title>
                <span class="hidden-sm-and-down">{{namaPTAlias}}</span>
            </v-toolbar-title>
            <v-spacer />
            <v-btn to="/login" link>
                Login
            </v-btn>
        </v-app-bar>
        <v-content>
            <slot/>
        </v-content>        
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name:'FrontLayout',
    created ()
    {
        this.$store.dispatch('identitas/init',this.$ajax);   
             
    },
    computed :{
        ...mapGetters('identitas',{
            namaPTAlias: 'getNamaPTAlias'
        })
    }
}
</script>