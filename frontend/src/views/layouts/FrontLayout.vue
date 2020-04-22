<template>
    <div>
        <v-app-bar app>
            <v-toolbar-title>
                <span class="hidden-sm-and-down">{{namaPTAlias}}</span>
            </v-toolbar-title>
        </v-app-bar>
        <v-content>
            <slot/>
        </v-content>        
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    name:'FrontLayout',
    created ()
    {
        this.$store.dispatch('identitas/getAll',this.$ajax);
    },
    computed :{
        ...mapState({
            namaPTAlias: state => state.nama_pt_alias
        })
    }
}
</script>