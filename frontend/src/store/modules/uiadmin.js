//state
const getDefaultState = () => 
{
    return {      
             
    }
}
const state = getDefaultState();

//mutations
const mutations = {    
    resetState (state) {
        Object.assign(state, getDefaultState())
    }
}
const getters= {
    
}
const actions = {
    
}
export default {
    namespaced: true,
    state,        
    mutations,
    getters,
    actions
}