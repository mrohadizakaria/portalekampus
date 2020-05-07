//state
const getDefaultState = () => 
{
    return {      
        loaded:false,  
        daftar_ta:[]
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
    resetState (state) {
        Object.assign(state, getDefaultState())
    }
}
const getters= {
    getDaftarTA: state => 
    {   
        return state.daftar_ta;
    },
}
const actions = {    
    init: async function ({commit,state,rootGetters},ajax)
    {
        let token=rootGetters['auth/Token'];  
        // console.log(token)                   
        if (!state.loaded)
        {   
            // await ajax.get();               
            await ajax.get('/system/setting/uiadmin',               
                {
                    headers:{
                        Authorization:token
                    }
                }
            ).then(({data})=>{                   
                commit('setDaftarTA',data.daftar_ta);
                // commit('setDaftarTA',[]);
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