//state
const getDefaultState = () => 
{
    return {      
        loaded:false,  
        nama_pt_alias:'',
    }
}
const state = getDefaultState();

//mutations
const mutations = {
    setLoaded(state,loaded)
    {
        state.loaded=loaded;
    },
    setNamaPTAlias(state,nama)
    {
        state.nama_pt_alias = nama;
    },    
    resetState (state) {
        Object.assign(state, getDefaultState())
    }
}
const getters= {
    isLoaded : state => {
        return state.loaded;
    },
    getNamaPTAlias: state => 
    {
        return state.nama_pt_alias;
    }
}
const actions = {
    init: async function ({commit,state},ajax)
    {
        if (!state.loaded)
        {
            await ajax.get('/setting/identitas/namaptalias').then(({data})=>{            
                commit('setNamaPTAlias',data.result);
                commit('setLoaded',true);
            })
        }
    }
}
export default {
    namespaced: true,
    state,        
    mutations,
    getters,
    actions
}