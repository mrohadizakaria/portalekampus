<template>
    <v-form v-model="form_valid" ref="frmpersyaratan" lazy-validation>
        <v-card class="mx-auto" max-width="400">
            <v-img class="white--text align-end" height="200px" :src="photoPersyaratan"></v-img>                
            <v-card-text class="text--primary">
                <div>
                    <v-file-input 
                        accept="image/jpeg,image/png" 
                        :label="item.nama_persyaratan+' (.png atau .jpg)'"
                        :rules="rule_foto"
                        show-size
                        v-model="filepersyaratan[index]"
                        @change="previewImage">
                    </v-file-input>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn
                    color="orange"
                    text
                    @click="upload(index,item)"
                >
                    Upload
                </v-btn>

                <v-btn
                    color="orange"
                    text
                >
                    Hapus
                </v-btn>
            </v-card-actions>
        </v-card>            
    </v-form>        
</template>
<script>
export default {
    name:'FileUploadPersyaratan',
    created ()
    {
        this.image_prev=this.item.path;
    },
    props:{
        index:Number,
        item:Object
    },
    data:()=>({        
        image_prev:null,
        //form
        form_valid:true,
        filepersyaratan:[],
        //form rules  
        rule_foto:[
            value => !!value||"Mohon pilih gambar !!!",  
            value =>  !value || value.size < 2000000 || 'File foto harus kurang dari 2MB.'                
        ],
    }),
    methods: {
        previewImage (e)
        {
            if (typeof e === 'undefined')
            {
                this.image_prev=null;
            }
            else
            {
                let reader = new FileReader();
                reader.readAsDataURL(e);
                reader.onload = img => {                    
                    this.image_prev=img.target.result;
                }
            }          
        },
        upload(index,item)
        {
            let data = item;   
            if (this.$refs.frmpersyaratan.validate())
            {
                if (typeof this.filepersyaratan[index] !== 'undefined')
                {
                    console.log(data);        
                    console.log(this.filepersyaratan[index]);                    
                }               
            }            
        }
    },
    computed:{
        photoPersyaratan:{
            get ()
            {   
                if (this.image_prev==null)
                {
                    return require('@/assets/no-image.png');
                }
                else
                {
                    return this.image_prev;
                }
            },
            set (val)
            {
                this.image_prev=val;
            }
            
        },
    }
}
</script>