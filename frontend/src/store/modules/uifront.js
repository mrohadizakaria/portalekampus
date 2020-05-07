//state
const getDefaultState = () => 
{
    return {      
        loaded:false,  
        captcha_public_key:'',
        tahun_pendaftaran:new Date().getFullYear(),
        identitas:{
            nama_pt:'',
            nama_pt_alias:''
        },        
    }
}
const state = getDefaultState();

//mutations
const mutations = {
    setLoaded(state,loaded)
    {
        state.loaded=loaded;
    },
    setCaptchaPublicKey(state,key)
    {
        state.captcha_public_key = key;
    },    
    setTahunPendaftaran(state,tahun)
    {
        state.tahun_pendaftaran = tahun;
    },    
    setIdentitas(state,identitas)
    {
        state.identitas = identitas;
    },    
    resetState (state) {
        Object.assign(state, getDefaultState())
    }
}
const getters= {
    isLoaded : state => {
        return state.loaded;
    },
    getCaptchaKey: state => 
    {   
        return state.captcha_public_key;
    },
    getTahunPendaftaran: state => 
    {             
        return state.tahun_pendaftaran;
    },
    getNamaPT: state => 
    {             
        return state.identitas.nama_pt;
    },
    getNamaPTAlias: state => 
    {
        return state.identitas.nama_pt_alias;
    }
}
const actions = {
    init: async function ({commit,state},ajax)
    {        
        if (!state.loaded)
        {            
            await ajax.get('/system/setting/uifront').then(({data})=>{                        
                commit('setCaptchaPublicKey',data.captcha_public_key);                                         
                commit('setTahunPendaftaran',data.tahun_pendaftaran);                                         
                commit('setIdentitas',data.identitas);                                                         
                commit('setLoaded',true);
            })
        }
    },
    reinit({commit})
    {
        commit('setLoaded',false);
    }
}
export default {
    namespaced: true,
    state,        
    mutations,
    getters,
    actions
}