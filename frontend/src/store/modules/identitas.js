//state
const getDefaultState = () => 
{
    return {        
        nama_pt_alias:'',
    }
}
const state = getDefaultState();

//mutations
const mutations = {
    setNamaPTAlias(state,nama)
    {
        state.nama_pt_alias = nama;
    },
    resetState (state) {
        Object.assign(state, getDefaultState())
    }
}
const actions = {
    getAll: async function ({commit},ajax)
    {
        commit('setNamaPTAlias','Test');
        await ajax.get('/setting/identitas/namaptalias').then(({data})=>{
            console.log(data);
        })
    }
}
export default {
    namespaced: true,
    state,        
    mutations,
    actions
}