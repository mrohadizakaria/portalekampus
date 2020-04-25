//state
const getDefaultState = () => 
{
    return {      
        token:null,        
        user:null
    }
}
const state = getDefaultState();

//mutations
const mutations = {
    setToken: (state,token) => {     
        state.token = token;
    },
    setUser: (state,user) => {
        state.user = user;
    },
    resetState (state) {
        Object.assign(state, getDefaultState())
    }
}
const getters= {
    Authenticated: state => {
        return state.token != null && state.user != null; 
    },
}
const actions = {
    afterLoginSuccess ({commit},data)
    {
        commit('setToken',data.token);
        commit('setUser',data.user);
    }
}
export default {
    namespaced: true,
    state,        
    mutations,
    getters,
    actions
}