//state
const getDefaultState = () => 
{
    return {      
        loaded:false,  
        daftar_ta:[],
        tahun_masuk:0,
    }
}
const state = getDefaultState();

//mutations
const mutations = {    
    setLoaded(state,loaded)
    {
        state.loaded=loaded;
    },
    setDaftarTA(state,daftar)
    {
        state.daftar_ta=daftar;
    },
    setTahunMasuk(state,tahun)
    {
        state.tahun_masuk=tahun;
    },    
    resetState (state) {
        Object.assign(state, getDefaultState())
    }
}
const getters= {
    getDaftarTA: state => 
    {   
        return state.daftar_ta;
    },
    getTahunMasuk: state =>
    {
        return parseInt(state.tahun_masuk);
    }
}
const actions = {    
    init: async function ({commit,state,rootGetters},ajax)
    {       
        commit('setTahunMasuk',rootGetters['uifront/getTahunPendaftaran']);
        if (!state.loaded && rootGetters['auth/Authenticated'])
        {   
            let token=rootGetters['auth/Token'];                                                     
            await ajax.get('/system/setting/uiadmin',               
                {
                    headers:{
                        Authorization:token
                    }
                }
            ).then(({data})=>{                   
                commit('setDaftarTA',data.daftar_ta);            
                commit('setLoaded',false);              
            });      
        }
    },     
    reinit ({ commit }) 
    {
        commit('resetState');
    },
}
export default {
    namespaced: true,
    state,        
    mutations,
    getters,
    actions
}