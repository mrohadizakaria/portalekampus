<template>    
    <v-card
        class="clickable"
        @click.native="jawabSoal">
        <v-card-text>
            {{item.jawaban}}
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    name:'JawabanSoal',
    created ()
    {
             
    },
    props:{
        index:{
            type:Number,
            required:true
        },
        item:{
            type:Object,
            required:true
        }
    },
    data:()=>({     
        
    }),
    methods: {        
        jawabSoal ()
        {
            console.log('test');
        }
    }
}
</script>